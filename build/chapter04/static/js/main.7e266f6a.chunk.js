(this.webpackJsonplevels=this.webpackJsonplevels||[]).push([[0],{39:function(e,t,n){},41:function(e,t,n){},43:function(e,t,n){},44:function(e,t,n){"use strict";n.r(t);var o={};n.r(o),n.d(o,"MATERIALS_CONFIG",(function(){return l})),n.d(o,"START_ENV_CONFIG",(function(){return h})),n.d(o,"START_ENV_CONFIG_2",(function(){return d})),n.d(o,"START_ENV_CONFIG_3",(function(){return m})),n.d(o,"START_ENV_CONFIG_4",(function(){return p})),n.d(o,"studioConfig",(function(){return f})),n.d(o,"playerConfig",(function(){return b}));var r=n(9),a=n.n(r),i=n(11);function s(){return(s=Object(i.a)(a.a.mark((function e(t,n){var o,r,i;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c("pageLoaded",t,o={CONSTANTS:n}),r=o.loaderAssets,i=u(t),e.next=6,r.loadAssets(i);case 6:o.assets=e.sent,c("beforeStartPlay",t,o);case 8:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var c=function(e,t,n){for(var o=0;o<t.length;++o){var r=t[o],a=r.key,i=r.constr;r.initStateKey===e&&(n[a]=new i(n))}},u=function(e){for(var t=[],n=0;n<e.length;++n)if(e[n].assetsToLoad&&e[n].assetsToLoad.length)for(var o=0;o<e[n].assetsToLoad.length;++o)t.push(e[n].assetsToLoad[o]);return t},l={wall:{mat:"MeshPhongMaterial",props:{color:3377271,emissive:161052535,map:"mapFloorOuter",bumpMap:"mapFloorOuter",bumpScale:1,envMap:"skyBox",reflectivity:.3,shininess:60,specular:2236962}},groundTop:{mat:"MeshPhongMaterial",props:{color:11167334,emissive:11167334,map:"mapTop",bumpMap:"mapTop",bumpScale:1,envMap:"skyBox2",reflectivity:.5,specular:2236962}},road:{mat:"MeshPhongMaterial",props:{color:16777215,emissive:6710886,map:"mapFloorOuter2",bumpMap:"mapFloorOuter2",bumpScale:1,envMap:"skyBox",reflectivity:.3}},skin:{mat:"MeshPhongMaterial",props:{color:16777215,emissive:5592405,specular:16777215,shininess:12,bumpMap:"skin",bumpScale:.8,envMap:"skyBox",reflectivity:.5,map:"skin",skinning:!0}}},h={fogNear:-10,fogFar:20,color:4852293,backgroundImgKey:"skyBox2"},d={fogNear:-10,fogFar:0,color:4852293,backgroundImgKey:"skyBox2"},m={fogNear:20,fogFar:500,color:4852293,backgroundImgKey:"skyBox2"},p={fogNear:-10,fogFar:0,color:4852293,backgroundImgKey:null},f={canId:"webgl-canvas",rendererCon:{antialias:!0},amb:{color:10874053,strength:.8},sceneEnvironment:{fogNear:-20,fogFar:0,color:4852293,backgroundImgKey:"skyBox2"},composerAddPass:"Saturate"},b={speed:.8,speedRot:.02,speedDown:-.45,offsetFromFloor:10,offsetFromFloorFactor:.5,offsetWallCollision:3.5,level:-13,startRot:[0,0,0],startPos:[0,5,0],cameraData:{fov:90,ratio:window.innerWidth/window.innerHeight,near:.1,far:1e3,pos:[0,2,-.5]},frontObjPos:[0,0,-1],backObjPos:[0,0,1],lightDataOne:{color:5592405,strength:0,pos:[0,400,5]}},g=n(1),v=n(2),y=n(0),w=n(20),j=n(21),_=function(){var e=null,t=null,n=null,o=null;return function(r,a){return new Promise((function(i){(function(r){return"obj"===r?e=e||new w.a:"glb"===r||"gltf"===r?n=n||new j.a:"img"===r?t=t||new y.TextureLoader:"cubeTextures"===r?o=o||new y.CubeTextureLoader:void 0})(a).load(r,i)}))}},O=function(){function e(){Object(g.a)(this,e),this.resources={},this._load=_()}return Object(v.a)(e,[{key:"loadAssets",value:function(e){var t=this;return new Promise((function(n){var o=t._load,r=t.resources;function s(e){return c.apply(this,arguments)}function c(){return(c=Object(i.a)(a.a.mark((function t(i){var c,u,l,h;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!e[i]){t.next=5;break}return c=e[i],u=c.key,l=c.path,h=c.type,t.next=4,o(l,h);case 4:r[u]=t.sent;case 5:if(++i,e[i]){t.next=10;break}n(r),t.next=12;break;case 10:return t.next=12,s(i);case 12:case"end":return t.stop()}}),t)})))).apply(this,arguments)}s(0)}))}}]),e}(),C=function(){function e(){Object(g.a)(this,e),this._storage={}}return Object(v.a)(e,[{key:"emit",value:function(e){var t=this;return function(n){return k(t._storage)(e).forEach((function(e){return e(n)}))}}},{key:"subscribe",value:function(e){var t=this;return function(n){return k(t._storage)(e).push(n),function(){return t._storage[e]=t._storage[e].filter((function(e){return e!==n}))}}}},{key:"showAll",value:function(){var e={};for(var t in this._storage)e[t]=this._storage[t].length;console.log(e)}}]),e}(),k=function(e){return function(t){return e[t]=e[t]||[]}},x=n(4),S=n(16),T=n.n(S),D=n(7),A=n(10),M=n(6),P=(n(39),"en"),I=function(e){return function(t){return e[P]&&e[P][t]||t}},N=n(3),E=I({ru:{"Discovery of small android":"\u041f\u0443\u0442\u0435\u0448\u0435\u0441\u0442\u0432\u0438\u044f \u0434\u0440\u043e\u0438\u0434\u0430",Factory:"\u0424\u0430\u0431\u0440\u0438\u043a\u0430",Brige:"\u041c\u043e\u0441\u0442",Cube:"\u041a\u0443\u0431",Endways:"\u041d\u0430\u043f\u0440\u044f\u043c\u0438\u043a","in production":"\u0441\u043a\u043e\u0440\u043e.."," (current)":" (\u0442\u0443\u0442)","Author: ":"\u043e\u0442: ","Github: ":"\u0413\u0438\u0442\u0445\u0430\u0431: "}}),F=Object(D.b)((function(e){return Object(M.a)({},e.controls.infoPanelData)}))((function(e){return Object(N.jsxs)("div",{className:"info",children:[Object(N.jsx)("button",{className:"control butt-infoClose",onClick:function(){return e.dispatch({type:"TOGGLE_INFO"})},children:"x"}),Object(N.jsxs)("div",{className:"info-inner",children:[Object(N.jsx)("p",{children:E(e.title)}),Object(N.jsx)("p",{children:E(e.topText)}),Object(N.jsx)("ul",{children:e.chapters.map((function(t,n){return Object(N.jsxs)("li",{children:[n+1,".\xa0",t.href?Object(N.jsx)("span",{children:Object(N.jsx)("a",{href:t.href,target:"blank",children:E(t.text)})}):Object(N.jsx)("span",{children:E(t.text)}),n===e.currentChapterIndex&&E(" (current)")]},n)}))}),Object(N.jsx)("p",{children:e.bottomText}),Object(N.jsx)("ul",{children:e.afterWords.map((function(e,t){return Object(N.jsxs)("li",{children:[E(e.text),Object(N.jsx)("a",{href:e.href,target:"blank",children:E(e.aText)})]},t)}))})]})]})})),B=(n(41),Object(D.b)((function(e){return{isInfo:e.controls.isInfo,isShowControls:e.controls.isShowControls}}))((function(e){var t=Object(x.useState)(!0),n=Object(A.a)(t,2),o=n[0],r=n[1];return Object(x.useEffect)((function(){return e.gameContext.emitter.subscribe("screenMode")((function(e){"exitFullScreen"===e&&r(!0)}))})),Object(N.jsxs)("div",{className:"ui-controls",children:[e.isShowControls&&Object(N.jsx)("button",{className:"butt-left control",onMouseDown:function(){return e.gameContext.emitter.emit("mouseDown")("butt-left")},onTouchStart:function(){return e.gameContext.emitter.emit("mouseDown")("butt-left")},onMouseUp:function(){return e.gameContext.emitter.emit("mouseUp")("butt-left")},onTouchEnd:function(){return e.gameContext.emitter.emit("mouseUp")("butt-left")},children:"\u25c4"}),e.isShowControls&&Object(N.jsx)("button",{className:"butt-right control",onMouseDown:function(){return e.gameContext.emitter.emit("mouseDown")("butt-right")},onTouchStart:function(){return e.gameContext.emitter.emit("mouseDown")("butt-right")},onMouseUp:function(){return e.gameContext.emitter.emit("mouseUp")("butt-right")},onTouchEnd:function(){return e.gameContext.emitter.emit("mouseUp")("butt-right")},children:"\u25ba"}),e.isShowControls&&Object(N.jsx)("button",{className:"butt-front control",onMouseDown:function(){return e.gameContext.emitter.emit("mouseDown")("butt-front")},onTouchStart:function(){return e.gameContext.emitter.emit("mouseDown")("butt-front")},onMouseUp:function(){return e.gameContext.emitter.emit("mouseUp")("butt-front")},onTouchEnd:function(){return e.gameContext.emitter.emit("mouseUp")("butt-front")},children:"\u25b2"}),e.isShowControls&&Object(N.jsx)("button",{className:"butt-back control",onMouseDown:function(){return e.gameContext.emitter.emit("mouseDown")("butt-back")},onTouchStart:function(){return e.gameContext.emitter.emit("mouseDown")("butt-back")},onMouseUp:function(){return e.gameContext.emitter.emit("mouseUp")("butt-back")},onTouchEnd:function(){return e.gameContext.emitter.emit("mouseUp")("butt-back")},children:"\u25bc"}),e.isShowControls&&o&&Object(N.jsx)("button",{className:"butt-fullscreen control",onClick:function(){e.gameContext.emitter.emit("mouseDown")("butt-fullscreen"),r(!1)},children:"\u2752"}),!e.isInfo&&Object(N.jsx)("button",{className:"butt-info control",onClick:function(){return e.dispatch({type:"TOGGLE_INFO"})},children:"i"}),e.isInfo&&Object(N.jsx)(F,{})]})})));var W={dispatch:null},L=Object(D.b)((function(e){return{isShowControls:e.controls.isShowControls,isInfo:e.controls.isInfo}}))((function(e){return!W.dispatch&&(W.dispatch=e.dispatch),Object(N.jsxs)("div",{className:"ui",children:[!e.isInfo&&e.gameContext.CustomReactComponent&&Object(N.jsx)(e.gameContext.CustomReactComponent,{gameContext:e.gameContext}),Object(N.jsx)(B,{gameContext:e.gameContext})]})})),R=n(13),G=n(23),U={isShowControls:!0,isInfo:!1,infoPanelData:{title:"Discovery of small android",topText:"",chapters:[{text:"Factory",href:"http://js.otrisovano.ru/factory/"},{text:"Brige",href:"http://js.otrisovano.ru/bridge/"},{text:"Cube",href:"http://js.otrisovano.ru/levels/"},{text:"Endways",href:"http://js.otrisovano.ru/endways/"},{text:"in production"}],currentChapterIndex:null,bottomText:"",afterWords:[{text:"Author: ",aText:"www.otrisovano.ru",href:"http://otrisovano.ru"},{text:"Github: ",aText:"https://github.com/fire888/dark_boss",href:"https://github.com/fire888/dark_boss"}]}};var q=document.querySelector(".progress"),K=-100,z=!0;!function e(){z&&setTimeout((function(){0===++K&&(K-=100),q.style.marginLeft=K+"%",e()}),30)}();var H=function(){function e(t){Object(g.a)(this,e),t.dispatcher=W,this._root=t;var n=function(e){e.customStore||(e.customStore={});var t=Object(R.b)(Object(M.a)({controls:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:U,t=arguments.length>1?arguments[1]:void 0;return"TOGGLE_INFO"===t.type?Object(M.a)(Object(M.a)({},e),{},{isShowControls:!!e.isInfo,isInfo:!e.isInfo}):"CHANGE_INFO_CHAPTER"===t.type?Object(M.a)(Object(M.a)({},e),{},{infoPanelData:Object(M.a)(Object(M.a)({},e.infoPanelData),{},{currentChapterIndex:t.currentChapterIndex})}):"TOGGLE_CONTROLS"===t.type?Object(M.a)(Object(M.a)({},e),{},{isShowControls:t.is}):Object(M.a)({},e)}},e.customStore)),n=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||R.c;return Object(R.d)(t,n(Object(R.a)(G.a)))}(t);n&&T.a.render(Object(N.jsx)(D.a,{store:n,children:Object(N.jsx)(L,{gameContext:t})}),document.getElementById("root"))}return Object(v.a)(e,[{key:"showStartButton",value:function(e){var t=document.querySelector(".startbuttons-wrapper"),n=document.querySelector(".progress-wrapper"),o=function(e){var t;e.target.dataset&&e.target.dataset.lang&&(t=e.target.dataset.lang,P=t),document.querySelector(".start-screen").style.display="none"};z=!1,t.style.display="flex",t.addEventListener("click",(function(t){e(),o(t)})),n.style.display="none"}}]),e}(),V=n(46),Q=n(17),X=n(27),Y=n(25),Z=n(15),J={uniforms:{tDiffuse:{value:null}},vertexShader:"\nvarying vec2 vUv;\n\nvoid main() {\n  vUv = uv;\n  gl_Position = projectionMatrix*modelViewMatrix*vec4( position, 1.0 );\n}",fragmentShader:"\nuniform sampler2D tDiffuse;\nvarying vec2 vUv;\nvoid main() {\n  vec4 texel = texture2D( tDiffuse, vUv );\n  gl_FragColor = (texel * texel * texel) * vec4(3.);\n}"},$=n(24),ee=function(){function e(t){var n=this;Object(g.a)(this,e),this._root=t;var o=t.assets,r=t.emitter,a=t.CONSTANTS.studioConfig,i=a.canId,s=a.rendererCon,c=a.clearColor,u=a.amb;s.canvas=document.getElementById(i),this._renderer=new y.WebGLRenderer(s),this._renderer.setClearColor(c),this._renderer.setPixelRatio(window.devicePixelRatio),this._renderer.setSize(window.innerWidth,window.innerHeight),this._scene=new y.Scene;var l=t.CONSTANTS.studioConfig.sceneEnvironment,h=l.color,d=l.fogNear,m=l.fogFar,p=l.backgroundImgKey;this._scene.background=o[p]||null,this._scene.fog=new y.Fog(h,d,m),this._lightA=null;var f=u.color,b=u.strength;this._lightA=new y.AmbientLight(f,b),this._scene.add(this._lightA),this._playerCamera=new y.PerspectiveCamera(90,window.innerWidth/window.innerHeight,.1,5e3),this._controlsCamera=new y.PerspectiveCamera(90,window.innerWidth/window.innerHeight,.1,5e3),this._controlsCamera.position.set(0,0,20);var v=new $.a(this._controlsCamera,this._renderer.domElement);v.target.set(0,0,0),v.update(),this._composer=new X.a(this._renderer),this._renderPass=new Y.a(this._scene,this._controlsCamera),this._composer.addPass(this._renderPass),this._root.CONSTANTS.studioConfig.composerAddPass&&"Saturate"===this._root.CONSTANTS.studioConfig.composerAddPass&&this._composer.addPass(new Z.a(J));var w=new y.Vector3,j=!0;r.subscribe("keyEvent")((function(e){e.o&&(j?(j=!1,n._renderPass.camera=n._controlsCamera,n._playerCamera.getWorldPosition(w),n._controlsCamera.position.x=w.x+100,n._controlsCamera.position.y=w.y+100,n._controlsCamera.position.z=w.z,v.target.set(w.x,w.y,w.z),v.update()):(j=!0,n._renderPass.camera=n._playerCamera))}));var _=function(){var e={width:window.innerWidth,height:window.innerHeight};n._renderer.setSize(e.width,e.height),n._composer.setSize(e.width,e.height),n._controlsCamera&&(n._controlsCamera.aspect=e.width/e.height,n._controlsCamera.updateProjectionMatrix()),n._playerCamera&&(n._playerCamera.aspect=e.width/e.height,n._playerCamera.updateProjectionMatrix())};window.addEventListener("resize",_),_(),this.addToScene=this._scene.add.bind(this._scene),this.removeFromScene=this._scene.remove.bind(this._scene);r.subscribe("frameUpdate")((function(){n._composer.render(n._scene,n._controlsCamera)})),this._backgroundImgKey=t.CONSTANTS.studioConfig.sceneEnvironment.backgroundImgKey,r.subscribe("changeSceneEnvironment")((function(e){console.log("deprecated!!","studio","changeSceneEnvironment",e)}))}return Object(v.a)(e,[{key:"setCamera",value:function(e){this._playerCamera=e,this._renderPass.camera=this._playerCamera}},{key:"changeEnvironment",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;this._changeFog(e,t),this._changeBackground(e,t)}},{key:"_changeFog",value:function(e,t){var n=this,o=e.fogNear,r=e.fogFar,a=e.color;if(this._scene.fog.near!==o||this._scene.fog.far!==r||this._scene.fog.color!==r){var i={color:this._scene.fog.color,near:this._scene.fog.near,far:this._scene.fog.far},s={color:new y.Color(a),near:o,far:r};new Q.a(i).to(s,t&&t.time||3e3).onUpdate((function(){n._scene.fog.color=i.color,n._scene.fog.near=i.near,n._scene.fog.far=i.far,t?t.updateAmb&&(n._lightA.color=i.color):n._lightA.color=i.color,n._renderer.setClearColor(i.color)})).start()}}},{key:"_changeBackground",value:function(e){var t=e.backgroundImgKey;t!==this._backgroundImgKey&&(this._backgroundImgKey=t,this._scene.background=this._root.assets[t]||null)}}]),e}(),te=function(){function e(t){Object(g.a)(this,e);var n=t.emitter,o={up:!1,down:!1,left:!1,right:!1,p:!1},r={up:!0,down:!0,left:!0,right:!0};this.keysEnabled=r,this.keys=o;var a=function(e,t){switch(e){case 38:case 87:r.up&&(o.up=t);break;case 40:case 83:r.down&&(o.down=t);break;case 37:case 65:o.left=t;break;case 39:case 68:o.right=t;break;case 79:o.o=t;break;case 80:o.p=t}n.emit("keyEvent")(o)};document.addEventListener("keydown",(function(e){return a(e.keyCode,!0)})),document.addEventListener("keyup",(function(e){return a(e.keyCode,!1)})),n.subscribe("mouseDown")((function(e){"butt-left"===e&&a(37,!0),"butt-right"===e&&a(39,!0),"butt-front"===e&&a(38,!0),"butt-back"===e&&a(40,!0)})),n.subscribe("mouseUp")((function(e){"butt-left"===e&&a(37,!1),"butt-right"===e&&a(39,!1),"butt-front"===e&&a(38,!1),"butt-back"===e&&a(40,!1)}))}return Object(v.a)(e,[{key:"toggleEnableKeys",value:function(e,t){this.keysEnabled[e]=t,!t&&(this.keys[e]=!1)}}]),e}(),ne=function(){function e(t){Object(g.a)(this,e);var n=t.studio,o=t.CONSTANTS.playerConfig,r=(o.startPos,o.startRot,o.cameraData),a=(o.frontObjPos,o.backObjPos,o.lightDataOne);this._camera=null,this.isBlocked=!0,this.isFreeze=!0,this.mesh=new y.Object3D,this.mesh.rotation.fromArray([0,0,0]),this.mesh.userData.type="player",this.bottomObj=new y.Object3D,this.bottomObj.position.fromArray([0,-.02,0]),this.mesh.add(this.bottomObj),this.frontObj=new y.Object3D,this.frontObj.position.fromArray([0,0,-.02]),this.mesh.add(this.frontObj),this.backObj=new y.Object3D,this.backObj.position.fromArray([0,0,.02]),this.mesh.add(this.backObj);var i=r.fov,s=r.ratio,c=r.near,u=r.far;r.pos;this._camera=new y.PerspectiveCamera(i,s,c,u),this._camera.position.fromArray([0,0,-2]),this.mesh.add(this._camera);var l=a.color,h=a.strenth,d=a.pos,m=new y.PointLight(l,h);m.position.fromArray(d),this.mesh.add(m),n.setCamera(this._camera),n.addToScene(this.mesh)}return Object(v.a)(e,[{key:"toggleFeeze",value:function(e){this.isFeeze=e}},{key:"toggleCanMove",value:function(e,t){}},{key:"getObj",value:function(){return this.mesh}},{key:"getCamera",value:function(){return this._camera}},{key:"setToPos",value:function(e,t,n){this.mesh.position.set(e,t,n)}}]),e}(),oe=function(e,t){for(var n in e)e[n].wrapS&&(e[n].wrapS=e[n].wrapT=y.RepeatWrapping);var o=["bumpMap","envMap","map","normalMap","lightMap","aoMap"],r={},a=function(n){r[n]=new y[t[n].mat](Object(M.a)({},t[n].props)),o.map((function(o){return t[n].props[o]&&(r[n][o]=e[t[n].props[o]])}))};for(var i in t)a(i);return r},re=function(e,t){var n={},o={};return e["level-rooms"].traverse((function(e){var r=null;if(e.name.includes("level")&&((r="level_020_001"===e.name?new y.Mesh(e.geometry,t.groundTop):new y.Mesh(e.geometry,t.wall)).name=e.name,n[e.name]=r),e.name.includes("roadwall")&&((r=new y.Mesh(e.geometry,t.road)).name=e.name,r.userData.isWallWalking=!0,n[e.name]=r),e.name.includes("level")||e.name.includes("roadwall")){var a=e.name.split("_");a[1]&&r&&(o[+a[1]]||(o[+a[1]]=[]),r.userData.area=+a[1],o[+a[1]].push(r))}})),{allMeshes:n,areas:o}},ae=n.p+"static/media/level02.e54f4bde.obj",ie=n.p+"static/media/floor_outer_map3.558e9646.jpg",se=n.p+"static/media/floor_outer_map2.2bd99ce1.jpg",ce=n.p+"static/media/floor_outer_map.35e50f6e.jpg",ue=n.p+"static/media/px.c5995c72.jpg",le=n.p+"static/media/nx.04390d21.jpg",he=n.p+"static/media/py.f7a76cc4.jpg",de=n.p+"static/media/ny.4e15a317.jpg",me=n.p+"static/media/pz.7c1308f5.jpg",pe=n.p+"static/media/nz.6287fe7d.jpg",fe=n.p+"static/media/px.96d0b65f.jpg",be=n.p+"static/media/nx.8cbf039d.jpg",ge=n.p+"static/media/py.659ebc34.jpg",ve=n.p+"static/media/ny.09051a4e.jpg",ye=n.p+"static/media/pz.a1539724.jpg",we=n.p+"static/media/nz.0bc769f7.jpg",je=function(){function e(){Object(g.a)(this,e),this._arrMeshes=[],this._vecStart=new y.Vector3,this._vecDir=new y.Vector3,this._rayCaster=new y.Raycaster(this._vecStart,this._vecDir)}return Object(v.a)(e,[{key:"setItemToCollision",value:function(e){for(var t=0;t<this._arrMeshes.length;++t)if(this._arrMeshes[t]===e)return;this._arrMeshes.push(e)}},{key:"removeItemFromCollision",value:function(e){this._arrMeshes=this._arrMeshes.filter((function(t){return t!==e}))}},{key:"checkCollisions",value:function(e,t,n){e.getWorldPosition(this._vecStart),t.getWorldPosition(this._vecDir),this._vecDir.sub(this._vecStart);var o=this._rayCaster.intersectObjects(this._arrMeshes);return o[0]&&o[0].distance<n?[!0,o[0]]:[!1,null]}}]),e}(),_e=function(e,t,n){return new Promise((function(o){var r=0;!function a(){if((r+=.03)>1&&(r=1),e.quaternion.slerpQuaternions(t,n,r),1===r)return o();setTimeout(a,15)}()}))},Oe=function(e,t,n,o){var r=function(n,o){if(e[n])for(var r=0;r<e[n].length;++r){var a=e[n][r];"remove"===o&&t.removeFromScene(a),"add"===o&&t.addToScene(a)}},a=function(t,o){if(e[t])for(var r=0;r<e[t].length;++r){var a=e[t][r];"remove"===o&&n.removeItemFromCollision(a),"add"===o&&n.setItemToCollision(a)}};return function(e){console.log(e),o.emit("levelChanged")(e),r(e-4,"remove"),r(e-3,"remove"),r(e-2,"add"),r(e-1,"add"),r(e,"add"),r(e+1,"add"),r(e+2,"add"),r(e+3,"add"),a(e-3,"remove"),a(e-2,"remove"),a(e-1,"add"),a(e,"add"),a(e+1,"add"),a(e+2,"add")}},Ce=Math.random,ke={0:{pos:[0,-55,-10.680000000000003],rot:[0,0,0],walkData:null,defaultAnimation:"dialog"},4:{pos:[-697.1507105430046,-31,278.81390042624884],rot:[0,Math.PI/2,0],walkData:"4",defaultAnimation:"walk"},13:{pos:[-946.6448542936033,1263,12.835633240896737],rot:[0,Math.PI/2,0],walkData:"13",defaultAnimation:"walk"},20:{pos:[-2145.4767672182593,2118.171875,4.885100091204412],rot:[0,Math.PI,0],walkData:null,defaultAnimation:"stay"}},xe=function(){function e(t){var n=this;Object(g.a)(this,e);var o=t.studio,r=t.assets,a=t.materials,i=t.emitter;this._currentArea=null,this._bot=r.bot.scene.children[0],this._bot.traverse((function(e){e.material=a.skin})),this._frontObj=new y.Object3D,this._frontObj.position.set(0,0,.1),this._bot.add(this._frontObj),this._bot.scale.set(1.15,1.15,1.15),this._animations=Se(r.bot),this._animations.play("walk"),this._freeWalk=Ae(this._bot,this._frontObj,20,i),this._areas=r.areas,o.addToScene(this._bot),i.subscribe("frameUpdate")((function(e){n._bot.visible&&n._animations.update(e)}));var s=[];i.subscribe("levelChanged")((function(e){if(12===e){for(var t=0;t<s.length;++t)if(13===s[t])return;s.push(13),n.setBotTo(13)}if(19===e){for(var o=0;o<s.length;++o)if(20===s[o])return;s.push(20),n.setBotTo(20)}}))}return Object(v.a)(e,[{key:"setBotTo",value:function(e){this._currentArea=e;var t=ke[e],n=t.pos,o=t.rot,r=t.walkData,a=t.defaultAnimation;if(this._animations.play(a),r){this._freeWalk.clearCollisions();for(var i=0;i<this._areas[r].length;++i)this._freeWalk.setItemToCollision(this._areas[r][i]);this._freeWalk.start()}else this._freeWalk.stop();this._bot.position.fromArray(n),this._bot.rotation.fromArray(o)}},{key:"getBot",value:function(){return this._bot}},{key:"getCurrentArea",value:function(){return this._currentArea}},{key:"startDialog",value:function(e){this._freeWalk.stop(),this._animations.play("dialog");var t=new y.Vector3(e.x,this._bot.position.y,e.z);this._bot.lookAt(t)}},{key:"stopDialog",value:function(){var e=ke[this._currentArea],t=e.walkData,n=e.defaultAnimation;t&&this._freeWalk.start(),this._animations.play(n)}}]),e}(),Se=function(e){var t=e.animations,n=new y.AnimationMixer(e.scene.children[0]),o=n.clipAction(t[2]);o.timeScale=1.5;var r=n.clipAction(t[0]);r.timeScale=3;var a=n.clipAction(t[1]);a.timeScale=1;var i={dialog:o,walk:r,stay:a},s=null;return{update:function(e){return n.update(e.delta)},play:function(e){s!==e&&(s=e,n.stopAllAction(),i[e].play())}}},Te=function(e){var t=(Ce()*Math.PI*1.5+1.3)*Ce()<.5?1:-1,n=t/40,o=0;return function(){return e.rotation.y+=n,++o<40}},De=function(e,t){var n=t?Math.min(t/.15,800*Ce()+300):null,o=0;return function(){return!!t&&(e.translateZ(.15),++o<n)}},Ae=function(e,t,n,o){var r=!1,a=Me(),i={rotate:Te,go:De},s="rotate",c=null,u=function(n){n||("rotate"===s&&(n="go"),"go"===s&&(n="rotate")),s=n;var o=a.checkCollisions(e,t);c=i[n](e,Math.max(o-20,0))};return u(s),o.subscribe("frameUpdate")((function(){r&&!c()&&u()})),{start:function(){u("rotate"),r=!0},stop:function(){return r=!1},setItemToCollision:a.setItemToCollision,removeItemFromCollision:a.removeItemFromCollision,clearCollisions:a.clearCollisions}},Me=function(){var e=[],t=new y.Vector3,n=new y.Vector3,o=new y.Raycaster(t,n);return{setItemToCollision:function(t){e.push(t)},removeItemFromCollision:function(t){e=e.filter((function(e){return e!==t}))},clearCollisions:function(){e=[]},checkCollisions:function(r,a){r.getWorldPosition(t),a.getWorldPosition(n),n.sub(t);var i=o.intersectObjects(e,!0);return!!i[0]&&i[0].distance}}},Pe=n.p+"static/media/botWalk.4572b94b.gltf",Ie=n.p+"static/media/skin.400fd57d.jpg",Ne=(n(43),{ru:{"What is this place ?":"\u0427\u0442\u043e \u044d\u0442\u043e \u0437\u0430 \u043c\u0435\u0441\u0442\u043e?","It's a great way up!":"\u042d\u0442\u043e \u0432\u0435\u043b\u0438\u043a\u0438\u0439 \u043f\u0443\u0442\u044c \u043d\u0430\u0432\u0435\u0440\u0445.","Who are you?":"\u041a\u0442\u043e \u0442\u044b?","I help the creator.":"\u042f \u043f\u043e\u043c\u043e\u0433\u0430\u044e \u0441\u043e\u0437\u0434\u0430\u0442\u0435\u043b\u044e.","What are you doing?":"\u0427\u0442\u043e \u0442\u044b \u0434\u0435\u043b\u0430\u0435\u0448\u044c?","Don't distract, I have to dig a tunnel.":"\u041d\u0435 \u043e\u0442\u0432\u043b\u0435\u043a\u0430\u0439, \u043c\u043d\u0435 \u043d\u0430\u0434\u043e \u043a\u043e\u043f\u0430\u0442\u044c \u0442\u0443\u043d\u043d\u0435\u043b\u044c.","Such large dungeons ...":"\u0422\u0430\u043a\u0438\u0435 \u0431\u043e\u043b\u044c\u0448\u0438\u0435 \u043f\u043e\u0434\u0437\u0435\u043c\u0435\u043b\u044c\u044f...","The Creator gave the order to dig.":"\u0421\u043e\u0437\u0434\u0430\u0442\u0435\u043b\u044c \u043f\u0440\u0438\u043a\u0430\u0437\u0430\u043b \u043a\u043e\u043f\u0430\u0442\u044c. ","How long have you been digging?":"\u041a\u0430\u043a \u0434\u043e\u043b\u0433\u043e \u0432\u044b \u043a\u043e\u043f\u0430\u043b\u0438? ","Time does not matter, the goal is important.":"\u0412\u0440\u0435\u043c\u044f \u043d\u0435 \u0438\u043c\u0435\u0435\u0442 \u0437\u043d\u0430\u0447\u0435\u043d\u0438\u044f, \u0432\u0430\u0436\u043d\u0430 \u0446\u0435\u043b\u044c. ","What do you do here ?":"\u0427\u0442\u043e \u0442\u044b \u0434\u0435\u043b\u0430\u0435\u0448\u044c?","Long ago, the Creator fell under the ground. He created us and gave us an assignment to dig.":"\u0414\u0430\u0432\u043d\u044b\u043c-\u0434\u0430\u0432\u043d\u043e \u0422\u0432\u043e\u0440\u0435\u0446 \u043f\u0440\u043e\u0432\u0430\u043b\u0438\u043b\u0441\u044f \u043f\u043e\u0434 \u0437\u0435\u043c\u043b\u044e. \u041e\u043d \u0441\u043e\u0437\u0434\u0430\u043b \u043d\u0430\u0441 \u0438 \u0434\u0430\u043b \u0437\u0430\u0434\u0430\u043d\u0438\u0435 \u043a\u043e\u043f\u0430\u0442\u044c. ","But here's the way out ...":"\u041d\u043e \u0432\u044b \u0443\u0436\u0435 \u043f\u0440\u043e\u0440\u044b\u043b\u0438 \u0432\u044b\u0445\u043e\u0434 ...","When we dug a path, the creator went through it.":"\u041a\u043e\u0433\u0434\u0430 \u043c\u044b \u043f\u0440\u043e\u0440\u044b\u043b\u0438 \u043f\u0443\u0442\u044c, \u0442\u0432\u043e\u0440\u0435\u0446 \u043f\u0440\u043e\u0448\u0435\u043b \u043f\u043e \u043d\u0435\u043c\u0443.","And...":"\u0418...","We are made to dig. And we keep on doing it. We believe that he will return to us.":"\u041c\u044b \u0441\u043e\u0437\u0434\u0430\u043d\u044b \u0434\u043b\u044f \u0442\u043e\u0433\u043e, \u0447\u0442\u043e\u0431\u044b \u043a\u043e\u043f\u0430\u0442\u044c. \u0418 \u043c\u044b \u043f\u0440\u043e\u0434\u043e\u043b\u0436\u0430\u0435\u043c \u044d\u0442\u043e \u0434\u0435\u043b\u0430\u0442\u044c. \u041c\u044b \u0432\u0435\u0440\u0438\u043c, \u0447\u0442\u043e \u043e\u043d \u0432\u0435\u0440\u043d\u0435\u0442\u0441\u044f \u043a \u043d\u0430\u043c. ","open dialog":"\u043d\u0430\u0447\u0430\u0442\u044c \u0434\u0438\u0430\u043b\u043e\u0433","close dialog":"\u0437\u0430\u043a\u043e\u043d\u0447\u0438\u0442\u044c \u0434\u0438\u0430\u043b\u043e\u0433","To be continued":"\u041f\u0440\u043e\u0434\u043e\u043b\u0436\u0435\u043d\u0438\u0435 \u0441\u043b\u0435\u0434\u0443\u0435\u0442",chapter:"\u0433\u043b\u0430\u0432\u0430",open:"\u043f\u0443\u0441\u043a","Author: ":"\u0410\u0432\u0442\u043e\u0440: ",link:"\u0441\u0441\u044b\u043b\u043a\u0430"}}),Ee=I(Ne),Fe=Object(D.b)((function(e){return{userReplicies:e.ui.userReplicies}}))((function(e){return Object(N.jsx)("div",{className:"replicies",children:e.userReplicies.map((function(t){return Object(N.jsx)("button",{onClick:function(){e.dispatch({type:"CLICK_PHRASE",phrase:t}),setTimeout((function(){e.dispatch({type:"PHRASE_EVENT",phrase:t})}),1e3)},children:Ee(t.q)},Math.floor(1e5*Math.random()))}))})})),Be=I(Ne),We=Object(D.b)((function(e){return{botAnswers:e.ui.botAnswers}}))((function(e){return Object(N.jsx)("div",{className:"messages",children:e.botAnswers.map((function(e){return Object(N.jsxs)("div",{children:[Object(N.jsx)("div",{className:"q",children:Be(e.q)}),Object(N.jsx)("div",{className:"a",children:Be(e.a)})]},Math.floor(1e5*Math.random()))}))})})),Le=I(Ne);var Re=Object(D.b)((function(e){return{isButtonDialog:e.ui.isButtonDialog,isShowFinalMessage:e.ui.isShowFinalMessage,isShowPalleteDialog:e.ui.isShowPalleteDialog}}))((function(e){return Object(N.jsxs)(N.Fragment,{children:[(!e.isShowFinalMessage&&e.isButtonDialog||e.isShowPalleteDialog)&&Object(N.jsx)("div",{className:"dialog-wrapper",children:Object(N.jsxs)("div",{className:"dialog-content",children:[e.isShowPalleteDialog&&Object(N.jsxs)("div",{className:"messages-wrapper",children:[Object(N.jsx)(We,{}),Object(N.jsx)(Fe,{})]}),e.isButtonDialog&&Object(N.jsx)("button",{className:"dialog-button-toggle",onClick:function(){return e.dispatch({type:"TOGGLE_DIALOG",isShowPalleteDialog:!e.isShowPalleteDialog})},children:e.isShowPalleteDialog?Le("close dialog"):Le("open dialog")})]})}),e.isShowFinalMessage&&Object(N.jsx)("div",{className:"final-mess",children:Le("To be continued")})]})})),Ge=n(26),Ue={botAnswers:[],userReplicies:[],isShowControls:!0,isButtonDialog:!1,isShowPalleteDialog:!1,isShowFinalMessage:!1,currentBot:null,phraseIndex:0,isDialogComplete:!1,phrasesData:{4:[{q:"What is this place ?",a:"It's a great way up!",event:"nextReply"},{q:"Who are you?",a:"I help the creator.",event:"nextReply"},{q:"What are you doing?",a:"Don't distract, I have to dig a tunnel.",event:"close"}],13:[{q:"Such large dungeons ...",a:"The Creator gave the order to dig.",event:"nextReply"},{q:"How long have you been digging?",a:"Time does not matter, the goal is important.",event:"close"}],20:[{q:"What do you do here ?",a:"Long ago, the Creator fell under the ground. He created us and gave us an assignment to dig.",event:"nextReply"},{q:"But here's the way out ...",a:"When we dug a path, the creator went through it.",event:"nextReply"},{q:"And...",a:"We are made to dig. And we keep on doing it. We believe that he will return to us.",event:"close"}]}},qe=[{key:"emitter",constr:C,initStateKey:"pageLoaded"},{key:"deviceResizer",constr:function e(t){Object(g.a)(this,e);var n=t.emitter,o=t.appWrapper;!o&&(o=document.querySelector(".app-wrapper")),n.subscribe("mouseDown")((function(e){"butt-fullscreen"===e&&r()}));var r=function(){o.requestFullscreen?o.requestFullscreen():o.mozRequestFullScreen?o.mozRequestFullScreen():o.webkitRequestFullscreen?o.webkitRequestFullscreen():o.msRequestFullscreen&&o.msRequestFullscreen()},a=function(e){o.style.width=window.innerWidth+"px",o.style.height=window.innerHeight+"px",o.style.fontSize=Math.max(Math.min(Math.min(window.innerWidth,window.innerHeight),400),350)/50+"px",document.fullscreenElement||n.emit("screenMode")("exitFullScreen")};window.addEventListener("resize",a),a()},initStateKey:"pageLoaded"},{key:"loaderAssets",constr:O,initStateKey:"pageLoaded"},{key:"frameUpdater",constr:function e(t){Object(g.a)(this,e);var n=t.emitter.emit("frameUpdate"),o={time:0,delta:0,count:0,oldTime:0},r=V.a((function(){return o}),(function(e){return e.time=Date.now(),e}),(function(e){return e.delta=.001*(e.time-e.oldTime),(isNaN(e.delta)||e.delta>1e3||0===e.delta)&&(e.delta=1e3/60*.001),e}),(function(e){return e.count=e.delta/(1/60),e}),(function(e){return n(e),e}),(function(e){return e.oldTime=e.time,e}),(function(e){return o=e}));!function e(){requestAnimationFrame(e),r(o)}()},initStateKey:"beforeStartPlay"},{key:"tweenUpdater",constr:function e(t){Object(g.a)(this,e),t.emitter.subscribe("frameUpdate")((function(){return Q.b()}))},initStateKey:"beforeStartPlay"},{key:"studio",constr:ee,initStateKey:"beforeStartPlay"},{key:"keyBoard",constr:te,initStateKey:"beforeStartPlay"},{key:"player",constr:ne,initStateKey:"beforeStartPlay"},{key:"materialsLib",constr:function e(t){Object(g.a)(this,e);var n=t.assets,o=t.CONSTANTS;t.materials=oe(n,o.MATERIALS_CONFIG)},initStateKey:"beforeStartPlay"},{key:"level",constr:function e(t){Object(g.a)(this,e);t.studio;var n=t.assets,o=t.materials,r=re(n,o),a=(r.allMeshes,r.areas);t.assets.areas=a},initStateKey:"beforeStartPlay",assetsToLoad:[{type:"obj",path:ae,key:"level-rooms"},{type:"cubeTextures",path:[ue,le,he,de,me,pe],key:"skyBox"},{type:"cubeTextures",path:[fe,be,ge,ve,ye,we],key:"skyBox2"},{type:"img",path:ie,key:"mapFloorOuter",wrap:!0},{type:"img",path:se,key:"mapFloorOuter2",wrap:!0},{type:"img",path:ce,key:"mapTop",wrap:!0}]},{key:"system_PlayerMoveOnLevel",constr:function e(t){var n=this;Object(g.a)(this,e);var o=t.emitter,r=t.CONSTANTS,a=t.player,i=(t.level,t.assets),s=t.studio,c=0;a.mesh.position.fromArray([0,-40,0]);var u=new je,l=Oe(i.areas,s,u,o);l(c);var h=r.playerConfig,d=h.speed,m=h.speedDown,p=h.speedRot,f=!0;a.toggleBlocked=function(e){return f=e},this.isCanMove={forward:!0,back:!0},a.toggleCanMove=function(e,t){return n.isCanMove[e]=t};var b={},v=new y.Quaternion,w=new y.Quaternion,j=new y.Vector3(0,1,0),_=function(){v.copy(a.mesh.quaternion),w.setFromAxisAngle(j,Math.random()*Math.PI*2),f=!0,_e(a.mesh,v,w).then((function(){a.mesh.up.copy(j),f=!1}))},O=function(e){var t=u.checkCollisions(a.mesh,a.frontObj,17),n=Object(A.a)(t,2),r=n[0],i=n[1];r&&i.object.userData.area!==c&&(c=i.object.userData.area,l(c)),r?i.object.userData.isWallWalking&&function(e){v.copy(a.mesh.quaternion);var t=(new y.Vector3).addVectors(a.mesh.position,e.face.normal);a.mesh.lookAt(t),a.mesh.up.copy(e.face.normal),a.mesh.rotateX(Math.PI/2),w.copy(a.mesh.quaternion),a.mesh.setRotationFromQuaternion(v),f=!0,_e(a.mesh,v,w).then((function(){f=!1}))}(i):(a.mesh.translateZ(-d*e.count),o.emit("playerMove")("forward"))};o.subscribe("keyEvent")((function(e){return b=e})),o.subscribe("frameUpdate")((function(e){b.left&&a.mesh.rotateY(p*e.count),b.right&&a.mesh.rotateY(-p*e.count),f||(!function(e){var t=u.checkCollisions(a.mesh,a.bottomObj,17.2),n=Object(A.a)(t,2),o=n[0],r=n[1];if(o&&r.object.userData.area!==c&&(c=r.object.userData.area,l(c)),!(o&&17>r.distance))return o?void(r.object.userData.isWallWalking||a.mesh.up.equals(j)||_()):(!a.mesh.up.equals(j)&&_(),void(a.mesh.position.y+=m*e.count));a.mesh.translateY(17-r.distance)}(e),b.up&&n.isCanMove.forward&&O(e),b.down&&n.isCanMove.back&&function(e){var t=u.checkCollisions(a.mesh,a.backObj,17);Object(A.a)(t,1)[0]||(a.mesh.translateZ(d*e.count),o.emit("playerMove")("back"))}(e),b.p&&console.log("player.mesh.position.fromArray([".concat(a.mesh.position.x,", ").concat(a.mesh.position.y+25,", ").concat(a.mesh.position.z,"])")))}))},initStateKey:"beforeStartPlay"},{key:"system_Monsters",constr:xe,initStateKey:"beforeStartPlay",assetsToLoad:[{type:"glb",path:Pe,key:"bot"},{type:"img",path:Ie,key:"skin",wrap:!0}]},{key:"system_PrepareDialogs",constr:function e(t){Object(g.a)(this,e);var n=t.emitter,o=t.player,r=t.system_Monsters,a=t.dispatcher,i=r.getBot(),s={forward:!1,back:!1},c=new y.Vector3,u=!1;n.subscribe("playerMove")((function(e){o.frontObj.getWorldPosition(c),c.distanceTo(i.position)>50?u&&(u=!1,a.dispatch({type:"TOGGLE_BUTTON",isButtonDialog:!1}),r.stopDialog()):(u||(u=!0,a.dispatch({type:"TOGGLE_BUTTON",isButtonDialog:!0,currentBot:r.getCurrentArea()}),r.startDialog(o.mesh.position)),"forward"===e&&c.distanceTo(i.position)<20&&!s[e]&&(s[e]=!0,o.toggleCanMove(e,!1),r.startDialog(o.mesh.position)),s.forward&&(s.back=!1,o.toggleCanMove("back",!0)))})),n.subscribe("frameUpdate")((function(){o.mesh.position.distanceTo(i.position)>30&&(s.forward||s.back)&&(s.forward=!1,s.back=!1,o.toggleCanMove("forward",!0),o.toggleCanMove("back",!0),r.stopDialog())}))},initStateKey:"beforeStartPlay"},{key:"customUi",constr:function e(t){Object(g.a)(this,e),t.appWrapper=document.querySelector(".app-wrapper"),t.CustomReactComponent=Re,t.customStore=function(e){return{ui:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Ue,n=arguments.length>1?arguments[1]:void 0;if("CLICK_PHRASE"===n.type)return Object(M.a)(Object(M.a)({},t),{},{botAnswers:[].concat(Object(Ge.a)(t.botAnswers),[n.phrase]),userReplicies:[]});if("PHRASE_EVENT"===n.type){var o=n.phrase,r=o.event;if(o.levelEvent,"nextReply"===r){var a=[t.phrasesData[t.currentBot][t.phraseIndex+1]];return Object(M.a)(Object(M.a)({},t),{},{phraseIndex:t.phraseIndex+1,userReplicies:a})}if("close"===r)return 20===t.currentBot&&setTimeout((function(){e.dispatcher.dispatch({type:"TOGGLE_BUTTON",isButtonDialog:!1}),e.dispatcher.dispatch({type:"TOGGLE_DIALOG",isShowPalleteDialog:!1}),e.studio.changeEnvironment(p,{updateAmb:!1,time:1500}),e.player.toggleBlocked(!0),setTimeout((function(){e.dispatcher.dispatch({type:"SHOW_FINAL_MESSAGE"})}),3e3)}),2e4),Object(M.a)(Object(M.a)({},t),{},{userReplicies:[],isDialogComplete:!0,isButtonDialog:!0})}if("TOGGLE_DIALOG"===n.type){var i=[];return e.player.toggleBlocked(n.isShowPalleteDialog),n.isShowPalleteDialog&&(i=t.isDialogComplete?[]:[t.phrasesData[t.currentBot][t.phraseIndex]]),Object(M.a)(Object(M.a)({},t),{},{isShowPalleteDialog:n.isShowPalleteDialog,userReplicies:i})}if("TOGGLE_BUTTON"===n.type){var s=t.botAnswers,c=t.phraseIndex,u=t.isDialogComplete;return n.currentBot&&n.currentBot!==t.currentBot&&(s=[],c=0,u=!1),Object(M.a)(Object(M.a)({},t),{},{phraseIndex:c,currentBot:n.currentBot||t.currentBot,isButtonDialog:n.isButtonDialog,isDialogComplete:u,botAnswers:s})}return"SHOW_FINAL_MESSAGE"===n.type?Object(M.a)(Object(M.a)({},t),{},{isShowFinalMessage:!0}):t}}}(t);var n=new H(t);t.ui=n},initStateKey:"pageLoaded"},{key:"starterPlay",constr:function e(t){Object(g.a)(this,e);var n=t.player,o=t.ui,r=t.studio,a=t.dispatcher,i=t.system_Monsters;a.dispatch({type:"CHANGE_INFO_CHAPTER",currentChapterIndex:3}),i.setBotTo(0);o.showStartButton((function(){r.changeEnvironment(h,{updateAmb:!1,time:1500}),setTimeout((function(){r.changeEnvironment(d,{updateAmb:!1,time:1500}),setTimeout((function(){i.setBotTo(4),r.changeEnvironment(m,{updateAmb:!1,time:1500}),n.toggleBlocked(!1)}),1500)}),4e3)}))},initStateKey:"beforeStartPlay"}];window.addEventListener("load",(function(){return function(e,t){return s.apply(this,arguments)}(qe,o)}))}},[[44,1,2]]]);
//# sourceMappingURL=main.7e266f6a.chunk.js.map