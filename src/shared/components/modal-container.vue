//
<script lang="tsx">
// import { Modal } from 'ant-design-vue'
// export default {
//   functional: true,
//   render(h, context) {
//     const { props } = context as any
//     const {
//       onCancel,
//       onOk,
//       close,
//       zIndex,
//       afterClose,
//       visible,
//       keyboard,
//       centered,
//       getContainer,
//       maskStyle,
//       okButtonProps,
//       cancelButtonProps,
//       iconType = 'question-circle',
//       closable = false
//     } = props

//     const icon = props.icon ? props.icon : iconType
//     const okType = props.okType || 'primary'
//     const prefixCls = props.prefixCls || 'ant-modal'
//     const contentPrefixCls = `${prefixCls}-confirm`
//     // 默认为 true，保持向下兼容
//     const okCancel = 'okCancel' in props ? props.okCancel : true
//     const width = props.width || 416
//     const style = props.style || {}
//     const mask = props.mask === undefined ? true : props.mask
//     // 默认为 false，保持旧版默认行为
//     const maskClosable =
//       props.maskClosable === undefined ? false : props.maskClosable

//     const transitionName = props.transitionName || 'zoom'
//     const maskTransitionName = props.maskTransitionName || 'fade'

//     // const classString = classNames(
//     //   contentPrefixCls,
//     //   `${contentPrefixCls}-${props.type}`,
//     //   `${prefixCls}-${props.type}`,
//     //   props.class
//     // )

//     return (
//       <Modal
//         visible={visible}
//         closable={closable}
//         title=""
//         transitionName={transitionName}
//         footer=""
//         maskTransitionName={maskTransitionName}
//         mask={mask}
//         maskClosable={maskClosable}
//         maskStyle={maskStyle}
//         style={style}
//         width={width}
//         zIndex={zIndex}
//         afterClose={afterClose}
//         keyboard={keyboard}
//         centered={centered}
//         getContainer={getContainer}
//       >
//         <div class={`${contentPrefixCls}-body-wrapper`}>
//           <div class={`${contentPrefixCls}-body`}>

//             <span class={`${contentPrefixCls}-title`}>
//               {typeof props.title === 'function' ? props.title(h) : props.title}
//             </span>
//             <div class={`${contentPrefixCls}-content`}>
//               {typeof props.content === 'function'
//                 ? props.content(h)
//                 : props.content}
//             </div>
//           </div>
//         </div>
//       </Dialog>
//     )
//   }
// }
//
</script>
