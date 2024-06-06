/*
	# About BottomPanel
	Renders a bottom panel which exposes a custom amount of content
	at the bottom of the screen in a "closed" state, along with an animated
	drag handle. The panel can then be "swiped" / "dragged" open by clicking
	or touching anywhere in the panel. The drag handle will animate smoothly
	between open/closed arrow states. The max open size of the panel can
	also be customized, defaults to entire window height. The BottomPanel
	wraps any children provided in a custom content area with overflow
	scrolling already enabled and tested to work with the swipe handlers.
	See prop documentation in the PropTypes definitions at the end of this file.
	
	# Using this Widget
	Example:
	```
	<BottomPanel
		closedPanelSize={useWindowRelativeSize((windowHeight) => windowHeight * 0.15)}
		maxOpenHeight={useWindowRelativeSize((windowHeight) => windowHeight * 0.95)}
	>
		<h1>Hello World</h1>
		<p>More content goes here</p>
	</BottomPanel>
	```
	More Complex example of using useWindowRelativeSize():
	```
	const closedPanelSize = useWindowRelativeSize(
		useCallback(
			(windowHeight) =>
				windowHeight *
				(currentTrip && currentTrip.status !== TripStatus.Draft ? 0.55 : 0.7),
			[currentTrip],
		),
	);
	<BottomPanel
		closedPanelSize={closedPanelSize}
	>
		<h1>Hello World</h1>
		<p>More content goes here</p>
	</BottomPanel>
	
	# References
		* Live demo of this component: https://www.josiahbryan.com/#/bottompanel-demo
		* Blog about this component: https://dev.to/josiahbryan/react-draggable-bottom-panel-17f0
		* Public Gist of this component: https://gist.github.com/josiahbryan/c220708256f7c8d79760aff37f64948f 
	# Credit
	Credit: This BottomPanel component based LARGELY on the example given by react-use-gesture
	in their CodePen at https://codesandbox.io/embed/zuwji?file=/src/index.js&codemirror=1
	
	I've simple adapted it by adding the open/close arrow as well as a scrollable content area.
	# Adding This Widget to a Project
	To use this panel in a project, you'll need to make sure you have the following
	dependencies added:
	* react - Obviously.
	* react-use-gesture - Core part of this panel, handles the events
	* react-spring - Core part of this panel, handles the buttery-smooth UI updates
	* node-sass - Required to support the styles
	* clsx - Utility to make className work easier
	* prop-types - Only for documentation
	* @material-ui/core - Only for the ripple effect, can be removed
*/

import clsx from "clsx";
import ButtonBase from "@material-ui/core/ButtonBase";
import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
} from "react";
import PropTypes from "prop-types";
import { useSpring, a, config } from "react-spring";
import { useGesture } from "react-use-gesture";
import styles from "./BottomPanel.module.scss";

/**
 * Context for use with useDragContext, this allows us to expose
 * `{ y, interpolate, drawerOpen, interpolate }` to children
 * without having to prop-drill.
 */
const DragContext = createContext({});

/**
 * Get access to the { y, interpolate, drawerOpen, interpolate } properties of the BottomPanel
 * @returns An object like { y, interpolate, drawerOpen, interpolate }
 */
export function useDragContext() {
  const context = useContext(DragContext);
  if (context === undefined) {
    throw new Error(`useDragContext must be called from inside a BottomPanel`);
  }
  return context;
}

/**
 * This is hook listens for keyboardStateChange events on the window,
 * and returns a state containing the `.keyboardHeight` prop from those
 * events. Obviously this is NOT a standard DOM event - this event
 * is emulated by our App.js by listening to @capacitor/keyboard
 * events. Since Capacitor's Keyboard plugin DOES NOT
 * support 'removeEventListener', we emit a fake event in App.js
 * which we listen for here.
 * @returns Height of the keyboard
 */
export function useKeyboardHeight() {
  const [height, setHeight] = useState(0);
  useEffect(() => {
    const keyboardStateChanged = ({ keyboardHeight }) => {
      setHeight(keyboardHeight || 0);
    };

    window.addEventListener("keyboardStateChanged", keyboardStateChanged);
    return () => {
      window.removeEventListener("keyboardStateChanged", keyboardStateChanged);
    };
  }, []);

  return height;
}

/**
 * Wrap the window 'resize' event and call the `resizeCb` every time the window resizes.
 * @param {function} resizeCb Function to execute when window is resized
 */
export function useWindowResized(resizeCb = () => {}) {
  useEffect(() => {
    window.addEventListener("resize", resizeCb);
    return () => {
      window.removeEventListener("resize", resizeCb);
    };
  }, [resizeCb]);
}

/**
 * Helper wrapper around useWindowResized() and a state variable that calls the
 * provided `getSizeCb` to get a new size whenever the window is resized
 * and then tracks that size in a state variable which it returns.
 *
 * This is important for mobile usage, because if there is an input
 * in the BottomPanel and it gains focus, which opens the keyboard,
 * this will resize the window. If your maxOpenHeight/closedPanelSize don't
 * recalculate, your input could be forced offscreen.
 *
 * If no callback given, just returns the full window height and will update
 * whenever the window resizes.
 *
 * Example usage:
 * ```
 * const maxOpenHeight = useWindowRelativeSize((windowHeight) => windowHeight * 0.8);
 * // Later:
 * <BottomPanel maxOpenHeight={maxOpenHeight} />
 * ```
 *
 * @param {function} getSizeCb Function that receives the window.innerHeight and returns a number. If no callback given, uses a default callback that just returns the full window height.
 * @returns A state variable that is updated when the window is resized or getSizeCb changes referentially
 */
export function useWindowRelativeSize(getSizeCb = (height) => height) {
  const keyboardHeight = useKeyboardHeight();
  const [size, setSize] = useState(
    getSizeCb(window.innerHeight - keyboardHeight)
  );
  useWindowResized(() => {
    setSize(getSizeCb(window.innerHeight - keyboardHeight));
  });

  useEffect(() => {
    setSize(getSizeCb(window.innerHeight - keyboardHeight));
  }, [getSizeCb, keyboardHeight]);

  return size;
}

/**
 * Purpose-built utility to find a parent node of `startNode`
 * that is scrollable (e.g. the content is larger than the node size).
 * This function will stop searching if it encounters a node
 * with a class containing the `stopClass`. If a scrollable parent is found,
 * that node is returned. If no scrollable parent found,
 * if `stopClass` is encountered, or if we reach the top of the DOM,
 * `null` is returned.
 *
 * This function is crucial in allowing scrollable areas to exist inside
 * the sheet and allowing the user to scroll those areas without
 * also dragging the sheet up or down.
 *
 * @param {HTMLElement} startNode Node to start searching at
 * @param {string} stopClass (optional) Class Name to break the search at (returns null if encountered on a parent)
 * @returns {HTMLElement|null} Returns the the scrollable node found, or `null` if no scrollable node found or `stopClass` found or reached the root of the DOM
 */
function findScrollableParentNode(startNode, stopClass) {
  let el = startNode;
  while (el.parentNode) {
    el = el.parentNode;
    if (stopClass && Array.from(el.classList).includes(stopClass)) {
      return null;
    }
    if (el.scrollWidth > el.clientWidth || el.scrollHeight > el.clientHeight) {
      return el;
    }
  }
  return null;
}

/**
 * Renders a bottom panel which exposes a custom amount of content
 * at the bottom of the screen in a "closed" state, along with an animated
 * drag handle. The panel can then be "swiped" / "dragged" open by clicking
 * or touching anywhere in the panel. The drag handle will animate smoothly
 * between open/closed arrow states. The max open size of the panel can
 * also be customized, defaults to entire window height. The BottomPanel
 * wraps any children provided in a custom content area with overflow
 * scrolling already enabled and tested to work with the swipe handlers.
 *
 * Default styles applied provide border radius, box shadow, background,
 * and other basic styles on the top-level sheet. These can be customized
 * by providing a custom `className` to override/add styles.
 *
 * You can also customize the content area (e.g. add padding or disabling
 * overflow scrolling) by giving a custom `contentClassName` to override/
 * add new styles to the content area.
 *
 * The drag handle can be disabled via `hideDragHandle` or changed from
 * arrows to a straight bar indicator by setting `barIndicator` to true.
 *
 * Programmatic opening/closing of the panel can be achieved by using
 * the `actionsRef` prop - see docs below on that prop.
 *
 * `closedPanelSize` reacts dynamically to prop changes as long as panel is closed.
 *
 * Note that children can access the `y`, `interpolate`, `movementAmount`,
 * and `drawerOpen` internal states via the exported `useDragContext`
 * hook. This allows children to access these props without prop-drilling
 * via a render function.
 *
 * The movement amount is also exposed in an `onMovement` callback.
 *
 * See PropTypes documentation below for more information on individual props.
 */
export default function BottomPanel({
  closedPanelSize = 100, // px
  maxOpenHeight: maxOpenHeightIncoming = null,
  actionsRef = {},
  className,
  contentClassName,
  barIndicator = false,
  hideDragHandle = false,
  children,
  onOpenClose,
  onMovement,
  clampDragToLimits = false,
  disableDrag,
  disableContentHeightInterpolation = false,
}) {
  const keyboardHeight = useKeyboardHeight();
  const windowHeight = useWindowRelativeSize();
  const maxOpenHeight = maxOpenHeightIncoming || windowHeight;

  const height = maxOpenHeight - closedPanelSize;
  const [{ y }, set] = useSpring(() => ({ y: height }));

  const [drawerOpen, setDrawerOpen] = useState();
  const [movementAmount, setMovementAmount] = useState(0);
  const [dragging, setDragging] = useState();

  // Sync the closedPanelSize with actual panel state
  // as long as the panel is "closed"
  const closedPanelSizeRef = useRef(closedPanelSize);
  if (closedPanelSizeRef.current !== closedPanelSize) {
    closedPanelSizeRef.current = closedPanelSize;
    if (!drawerOpen) {
      set({
        y: maxOpenHeight - closedPanelSize,
        immediate: false,
        config: config.stiff,
      });
    }
  }

  const open = ({ canceled } = {}) => {
    setDrawerOpen(true);
    // when cancel is true, it means that the user passed the upwards threshold
    // so we change the spring config to create a nice wobbly effect
    set({
      y: 0,
      immediate: false,
      config: canceled ? config.wobbly : config.stiff,
    });

    if (typeof onOpenClose === "function") {
      onOpenClose(true);
    }

    if (typeof onMovement === "function") {
      onMovement(1);
    }

    setMovementAmount(1);
  };

  const close = (velocity = 0) => {
    setDrawerOpen(false);
    set({ y: height, immediate: false, config: { ...config.stiff, velocity } });

    if (typeof onOpenClose === "function") {
      onOpenClose(false);
    }

    if (typeof onMovement === "function") {
      onMovement(0);
    }

    setMovementAmount(0);
  };

  const toggleDrawer = () => {
    if (drawerOpen) {
      close();
    } else {
      open();
    }
    return !drawerOpen;
  };

  // Expose programmatic controls
  // eslint-disable-next-line no-param-reassign
  actionsRef.current = {
    open,
    close,
    toggleDrawer,
  };

  // See notes in `onDragStart` for the purpose of this ref
  const scrollableParentRef = useRef();

  // We use the useGesture hook instead of the useDrag hook
  // so we can access the `onDragStart` handler to find scrollable parent nodes.
  // See notes in `onDragStart` on why this is needed.
  const bind = useGesture(
    {
      onDrag: ({
        last,
        vxvy: [, vy],
        movement: [, my],
        cancel,
        canceled,
        direction: [, dy],
      }) => {
        // Cancel the drag if dragging inside a scrollable node
        // inside the sheet. See notes below in onDragStart() for why/how.
        if (scrollableParentRef.current) {
          cancel();
          return;
        }

        // if the user drags up passed a threshold, then we cancel
        // the drag so that the sheet resets to its open position
        if (my < -70) {
          cancel();
        }

        // Clamp the drag to limits (top/bottom) if flag set
        const activeMy = clampDragToLimits
          ? Math.max(0, Math.min(height, my))
          : my;

        const openPercent = 1 - activeMy / height;
        setMovementAmount(openPercent);

        if (typeof onMovement === "function") {
          onMovement(openPercent);
        }

        // when the user releases the sheet, check direction last moving
        // and open or close based on swiping up or down
        if (last) {
          if (dy > 0) {
            close(vy);
          } else {
            open({ canceled });
          }
          setDragging(false);
        }
        // when the user keeps dragging, we just move the sheet according to
        // the cursor position
        else
          set({
            y: activeMy,
            immediate: true,
          });
      },
      onDragStart: ({ event: { target } }) => {
        // This is CRUCIAL to allowing content within the sheet to still be
        // scrollable (e.g. overflow: auto) without also dragging the
        // sheet up/down while scrolling up/down.
        // By looking for a scrollable parent (and stopping if we hit
        // the .sheet without finding a scrollable node), we can then
        // cancel the drag movement (above) if the drag gesture started
        // inside a scrollable node. This allows not only scrolling to work,
        // but taps inside the scrollable node to work as well.
        //
        // Note: We tried calling the state.cancel() method documented
        // from inside this onDragStart handler, but that did not stop
        // onDrag from starting anyway, so we use the ref here to
        // communicate with onDrag so it can cancel itself.
        //
        // We do the findScrollableParentNode() HERE in onDragStart because
        // it is potentially expensive if it has to traverse a lot of DOM nodes.
        // So we only do it at the start and then cache the result in the ref.
        // This allows drags that are NOT in a scrollable node (e.g.
        // we really want / that are legit drags) to move as smoothly as possible
        // because they aren't calling findScrollableParentNode() on every
        // move of the finger/mouse.
        const node = findScrollableParentNode(target, styles.sheet);
        scrollableParentRef.current = node;
        setDragging(true);
      },
    },
    {
      drag: {
        initial: () => [0, y.get()],
        filterTaps: true,
        bounds: { top: 0 },
        rubberband: true,
      },
    }
  );

  // These transformations represent the modifications to the
  // underlying before/after elements on the drag handle necessary to render
  // the open/closed arrow states. We rely on react-spring to interpolate
  // the intermediate frames in the `arrowStyle` prop below.
  const arrowStates = {
    closeArrow: {
      before: "translateX(calc(-50% - 0.675rem)) rotate(7deg)",
      after: "translateX(calc(-50% + 0.675rem)) rotate(-7deg)",
    },
    openArrow: {
      before: "translateX(calc(-50% - 0.675rem)) rotate(-7deg)",
      after: "translateX(calc(-50% + 0.675rem)) rotate(7deg)",
    },
  };

  // Interpolate helper for use below and exposure to children
  const interpolate = (from, to) => y.to([0, height], [to, from]);

  const arrowStyle = barIndicator
    ? {}
    : {
        // Interpolate between open/closed arrow states based on the
        // current drag state
        "--custom-before-tx": interpolate(
          arrowStates.openArrow.before,
          arrowStates.closeArrow.before
        ),
        "--custom-after-tx": interpolate(
          arrowStates.openArrow.after,
          arrowStates.closeArrow.after
        ),
      };

  // This is the state we expose to children via a render function
  // (if typeof children === 'function') and via the `useDragContext` hook above.
  const dragContextState = {
    drawerOpen: !!drawerOpen,
    movementAmount,
    // Expose react-spring utilities for use in
    // interpolation and potential advanced control by content
    a,
    y,
    set,
    height,
    interpolate,
  };

  return (
    <a.div
      className={clsx(
        styles.sheet,
        className,
        drawerOpen &&
          maxOpenHeight === window.innerHeight &&
          styles.fullWindowHeight
      )}
      {...(disableDrag ? {} : bind())}
      style={{
        y,
        bottom: `calc(-100vh + ${height}px + ${keyboardHeight}px)`,
        "--closed-panel-size": `${closedPanelSize}px`,
        // This height interpolation is necessary to ensure the content
        // can be scrolled all the way to the bottom regardless of if the panel
        // is open or closed
        // Users can choose to disable content height interpolation
        // if they know the last item in the panel is longer than the panel
        // and the panel overflows. (E.g. the ChooseDropoffWidget)
        // but for widgets where the content area is 'display: flex' and doesn't
        // overflow, interpolation prevents the content from "jumping" during drag.
        "--content-height": disableContentHeightInterpolation
          ? `${dragging || drawerOpen ? maxOpenHeight : closedPanelSize}px`
          : interpolate(`${closedPanelSize}px`, `${maxOpenHeight}px`),
        // Could do disable interpolation on --native-padding-adjust
        // but I feel like this is really needed. If we don't interpolate,
        // when used on a mobile device that has `--native-top-adjust` set,
        // the control arrow will jump at start/end of drag.
        // '--native-padding-adjust': drawerOpen
        // 	? `calc(var(--native-top-adjust) * 1)`
        // 	: `calc(var(--native-top-adjust) * 0)`,
        "--native-padding-adjust": hideDragHandle
          ? ""
          : interpolate(
              `calc(var(--native-top-adjust) * 0)`,
              `calc(var(--native-top-adjust) * 1)`
            ),
      }}
    >
      {!hideDragHandle && (
        <a.div
          className={clsx(
            styles.openCloseArrow,
            barIndicator ? styles.barIndicator : styles.customArrow
          )}
          style={arrowStyle}
          onClick={toggleDrawer}
        >
          {/* Just using ButtonBase for the ripples, nothing more. 
					    Feel free to disable/remove if MaterialUI not used. */}
          <ButtonBase />
        </a.div>
      )}

      <div className={clsx(styles.content, contentClassName)}>
        <DragContext.Provider value={dragContextState}>
          {typeof children === "function"
            ? children(dragContextState)
            : children}
        </DragContext.Provider>
      </div>
    </a.div>
  );
}

BottomPanel.defaultProps = {
  closedPanelSize: 100, // px
  maxOpenHeight: null,
  actionsRef: {},
  className: null,
  contentClassName: null,
  barIndicator: false,
  hideDragHandle: false,
  children: null,
  onOpenClose: () => {},
  onMovement: () => {},
  clampDragToLimits: false,
  disableDrag: false,
  disableContentHeightInterpolation: false,
};

BottomPanel.propTypes = {
  /**
   * BottomPanel works just fine with normal component wrapping,
   * e.g. `<BottomPanel><h1>Foobar</h1></BottomPanel>
   *
   * Children can access the internal state of the BottomPanel
   * via the `useDragContext` hook, or via a render function.
   *
   * The `useDragContext` hook exposes the same props
   * as shown below.
   *
   * For example:
   *
   * ```
   * <BottomPanel>{({
   * 	  drawerOpen,
   *    movementAmount,
   *    y,
   *    set,
   *    height,
   *    interpolate,
   *   }) => <>
   *      <h1>{drawerOpen ? 'Drawer Open' : 'Drawer Closed'}</h1>
   *      <p>Drag amount: {Math.round(movementAmount * 100)}%</p>
   *   </>}
   * </BottomPanel>
   * ```
   *
   * Note the props `y` and `set` - these expose the `react-spring`
   * data used internally. `y` specifically can be used to
   * interpolate content styles as the panel is dragged. For usage example,
   * check out how `arrowStyle` is calculated in the `<BottomPanel>` source.
   *
   * Take note of the `interpolate` function provided - it's a shortcut
   * wrapper around `y.to` with the proper args already set. It's signature
   * is `interpolate: (from, to) => (interpolated data)`, and you can use it
   * in child components like:
   *
   * ```
   * const style = { color: interpolate("#ff0000", "#00ff00") }
   * ```
   *
   * Using the `interpolate` function (or `y.to`) will automatically
   * update your child styles when the panel is dragged/swiped.
   *
   */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func,
  ]),

  /**
   * The `closedPanelSize` prop is the number of pixels
   * of the panel to be "exposed" at the bottom of the screen.
   *
   * Defaults to 100px
   */
  closedPanelSize: PropTypes.number,

  /**
   * The `maxOpenHeight` prop is the number of pixels the panel
   * will be allowed to take up when "open". (Number of pixels
   * from bottom of the screen)
   *
   * Defaults to `window.innerHeight`
   */
  maxOpenHeight: PropTypes.number,

  /**
   * You can provide a ref to the `actionsRef` prop to receive
   * an object containing keys called:
   *  * open: Function you can use to programmatically open the panel
   *  * open: Function you can use to programmatically close the panel
   *  * toggleDrawer: Function you can use to programmatically toggle between open/closed
   */
  actionsRef: PropTypes.shape({ current: PropTypes.any }),

  /**
   * `className` is a class name to apply to the top-level sheet element,
   * you can use this, for example, to customize the width. By default,
   * the sheet consumes 100% of the view width. You can, for example, apply
   * CSS like the following to add some margin:
   * ```
   *   .customSheet {
   *     left: 2vw;
   *     width: 96vw;
   *   }
   * ```
   * You can use this class to customize the border radius, background,
   * box shadow, etc.
   *
   * Note that by default, the top-level sheet also defines a custom
   * variable, `--arrow-height`, which sets the height of the active space
   * for the drag handle at the top of the sheet.
   *
   * You can consume this variable in child CSS in the sheet to add margin
   * to not appear underneath the drag handle.
   */
  className: PropTypes.string,

  /**
   * `contentClassName` is applied to the custom content area element
   * defined inside the sheet. The sheet provides an edge-to-edge content
   * element with overflow scrolling already enabled and tested to work.
   *
   * You can use this class to customize the margin/padding on the content,
   * or to disable overflow scrolling if desired.
   */
  contentClassName: PropTypes.string,

  /**
   * If you set `hideDragHandle` to true, the drag handle element
   * will not be rendered. Defaults to `false` meaning the drag
   * handle will be shown.
   */
  hideDragHandle: PropTypes.bool,

  /**
   * If you set `barIndicator` to true, the up/down arrow icon and custom
   * dragging animation will be disabled, and the drag handle element will
   * instead be rendered as a straight line approx ~2rem long.
   *
   * Defaults to `false`, which renders the up arrow and animates smoothly
   * to a down arrow as the panel is dragged.
   */
  barIndicator: PropTypes.bool,

  /**
   * Optional callback, receives a single boolean argument,
   * called when the sheet changes to fully open or fully closed.
   */
  onOpenClose: PropTypes.func,

  /**
   * Optional callback, receives a single number which expresses the percentage
   * amount that the sheet is open.
   *
   * This can be used to animate content / transition content as the panel is dragged.
   */
  onMovement: PropTypes.func,

  /**
   * If true, the user will be stopped from dragging the panel lower than `closedPanelSize`.
   * or higher than the top `maxOpenHeight`.
   *
   * By default this is set to false (disabled), so the user will be able to drag lower
   * than the `closedPanelSize` and drag above `maxOpenHeight`, but when stopping the drag,
   * then panel will revert the proper closed/open state. This only affects the "in-drag" motions.
   */
  clampDragToLimits: PropTypes.bool,

  /**
   * If `disableDrag` is set to true, it disables any user-initiated movement.
   * You can still change panel state using the `actionsRef` handlers or by changing
   * the `closedPanelSize` prop, but mouse/touch dragging will be disabled.
   *
   * This defaults to false, which means mouse/touch dragging is by default enabled.
   *
   * This prop pairs nicely with `hideDragHandle`, but does NOT automatically hide
   * drag handle if `disableDrag` is true - you must set `hideDragHandle` as well
   * if you want that hidden.
   */
  disableDrag: PropTypes.bool,

  /**
   * If `disableContentHeightInterpolation` is set to true, then when dragging
   * starts, the content height will be set to `maxOpenHeight`. Then when dragging stops,
   * if drawer is open, height will stay at `maxOpenHeight`, otherwise, height
   * would then be set to `closedPanelSize`.
   *
   * If this property is set to false (defaults to false), then the content height
   * will transition (be interpolated) smoothly between `closedPanelSize` and
   * `maxOpenHeight` during dragging.
   *
   * Disabling interpolation can give a slight performance boost, but it is only
   * worth doing if you know the last item in the panel is longer than the panel
   * and the content overflows the bottom of the panel (e.g. scrollable). In thise case,
   * you can set this prop to `true` to disable interpolation to give a slight
   * dragging increase because the user won't see any difference when the
   * content jumps to max height during drag because its scrollable so the
   * content shouldn't shift at the bottom of the screen visually.
   *
   * However, for content where the content area is 'display: flex' and doesn't
   * overflow the bottom of the panel, interpolation helps to prevents the content
   * from "jumping" during drag - in this case, you would want to leave this
   * prop at the default (false) to enhance the UX at the slight cost of
   * slightly worse performance during drag.
   */
  disableContentHeightInterpolation: PropTypes.bool,
};
