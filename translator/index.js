(function(s,n,e,p,r,c,g){"use strict";const{ScrollView:R,Text:_,TextInput:i,Platform:h}=e.ReactNative,{OS:B}=h,y=n.findByProps("ButtonColors","ButtonLooks","ButtonSizes").default,l=n.findByProps("openLazy","hideActionSheet"),u=n.findByProps("push","pushLazy","pop"),E=n.findByProps("getRenderCloseButton"),{default:S,getRenderCloseButton:C}=E,P=n.findByName("Icon"),{FormRow:v}=g.Forms,d=e.stylesheet.createThemedStyleSheet({codeBlock:{fontFamily:e.constants.Fonts.CODE_SEMIBOLD,fontSize:12,backgroundColor:r.semanticColors.BACKGROUND_SECONDARY,color:r.semanticColors.TEXT_NORMAL,marginTop:10,borderRadius:3,padding:10}}),z=c.before("openLazy",l,function(O){const[T,k,w]=O;k==="MessageLongPressActionSheet"&&T.then(function(A){const N=c.after("default",A,function(m,b){e.React.useEffect(function(){return function(){N()}},[]);let[x,f]=b.props?.children?.props?.children?.props?.children,t=x?.props?.message??w?.message;if(!f||!t)return;t.content;let a;const D=function(){return e.React.createElement(S,{initialRouteName:"RawPage",goBackOnBackPress:!0,screens:{RawPage:{title:"ViewRaw",headerLeft:C(function(){return u.pop()}),render:function(){const[V,I]=e.React.useState(t.content);return e.React.createElement(R,{style:{flex:1,marginHorizontal:13,marginVertical:10}},e.React.createElement(y,{text:"Save",color:"brand",size:"small",onPress:function(){const o={...t,content:V};console.log(o),t.content=a}}),B=="ios"?e.React.createElement(i,{style:d.codeBlock,onChangeText:function(o){return a=o},defaultValue:t.content,multiline:!0}):e.React.createElement(i,{style:d.codeBlock,onChangeText:function(o){return a=o},defaultValue:t.content,multiline:!0}))}}}})};f.push(e.React.createElement(v,{label:"Edit Message",leading:e.React.createElement(P,{source:p.getAssetIDByName("ic_message_edit")}),onPress:function(){l.hideActionSheet(),u.push(D)}}))})})}),L=function(){return z()};return s.onUnload=L,s})({},vendetta.metro,vendetta.metro.common,vendetta.ui.assets,vendetta.ui,vendetta.patcher,vendetta.ui.components);
