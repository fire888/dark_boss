(this.webpackJsonplevels=this.webpackJsonplevels||[]).push([[0],{15:function(e,t,r){"use strict";r.r(t);var n={};r.r(n),r.d(n,"SIZE_QUADRANT",(function(){return d})),r.d(n,"LOCATIONS_QUADRANTS",(function(){return g})),r.d(n,"MATERIALS_CONFIG",(function(){return v})),r.d(n,"CONFIG_FOR_INIT",(function(){return m})),r.d(n,"lCol",(function(){return y})),r.d(n,"lW",(function(){return w})),r.d(n,"ENV_START",(function(){return b})),r.d(n,"ENV_NORMAL",(function(){return _})),r.d(n,"ENV_RED",(function(){return M})),r.d(n,"ENV_RED_NEAR",(function(){return k})),r.d(n,"ENV_END",(function(){return O})),r.d(n,"START_ENV_CONFIG",(function(){return F})),r.d(n,"ENV_CONFIG_WORD_1",(function(){return S})),r.d(n,"ENV_CONFIG_WORD_2",(function(){return C})),r.d(n,"studioConfig",(function(){return N})),r.d(n,"playerConfig",(function(){return j}));var o=r(6),a=r.n(o),i=r(9);function s(){return(s=Object(i.a)(a.a.mark((function e(t,r){var n;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:c("pageLoaded",t,n={CONSTANTS:r}),n.loaderAssets,c("beforeStartPlay",t,n);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var c=function(e,t,r){for(var n=0;n<t.length;++n){var o=t[n],a=o.key,i=o.constr;o.initStateKey===e&&(r[a]=new i(r))}},u=r(2),l=[1,1,1],h=([].concat(l,l,l,l,l,l),[.5,1,0]),p=([].concat(h,h,h,h,h,h),[1,1,0]),f=([].concat(p,p,p,p,p,p),{iron:{mat:"MeshPhongMaterial",props:{color:3355443,lightMap:"ironAO",lightMapIntensity:.35,normalMap:"ironNormal",normalScale:new u.q(.1,.1),envMap:"skyBox3",reflectivity:.02,shininess:10,specular:16777215}},iron2:{mat:"MeshPhongMaterial",props:{color:13421772,lightMap:"ironAO",lightMapIntensity:.35,normalMap:"ironNormal",normalScale:new u.q(1,1),envMap:"skyBox3",reflectivity:.02,shininess:100,specular:131585}},floorMat1:{mat:"MeshPhongMaterial",props:{color:16777215,map:"mapTop",bumpMap:"mapTop",bumpScale:2,reflectivity:.1,shininess:.01,specular:16777215,emissive:5592405}},body:{mat:"MeshPhongMaterial",props:{color:16777215,envMap:"skyBox3",reflectivity:3,specular:16777215}},bodyRed:{mat:"MeshPhongMaterial",props:{color:11141120,envMap:"skyBox3",emissive:7798784,reflectivity:.01,specular:16711680}},bodyShadow:{mat:"MeshBasicMaterial",props:{color:2236976,transparent:!0,alphaMap:"bodyDropShadow",opacity:1}},whiteBasic:{mat:"MeshBasicMaterial",props:{color:16777215}},greenBasic:{mat:"MeshBasicMaterial",props:{color:3407701}},whiteBasic2:{mat:"MeshBasicMaterial",props:{color:11184810}}}),d=5e3,g={"3_-3":"location01","-3_-3":"location02","3_3":"location03","100_1000":"locationToFinish"},v=f,m={isInCar:!1,currentSceneConfig:{isInVirtual:!1,isPlayerInCar:!1,carProps:{keyMesh:"car",keyCollide:"carCollision",position:[0,-50,-100],rotation:[0,2,0]},bodyProps:{keyMesh:"body",position:[-20,-60,-50],rotation:[0,2,0]}}},y=[.3,1,.3],w=.2,b={fogNear:0,fogFar:0,colorFog:4544609,colorBack:4544609,backgroundImgKey:null},_={fogNear:0,fogFar:1e3,colorFog:4544609,colorBack:4544609,backgroundImgKey:null},M={fogNear:0,fogFar:1e3,colorFog:8912896,colorBack:65793,backgroundImgKey:null},k={fogNear:0,fogFar:40,colorFog:8912896,colorBack:65793,backgroundImgKey:null},O={fogNear:0,fogFar:0,colorFog:65793,colorBack:65793,backgroundImgKey:null},F={fogNear:0,fogFar:0,color:4852294,backgroundImgKey:null},S={fogNear:0,fogFar:1e3,color:4544609,backgroundImgKey:null},C={fogNear:1500,fogFar:3e3,color:0,backgroundImgKey:"skyBox"},N={canId:"webgl-canvas",rendererCon:{antialias:!0},amb:{color:16777215,strength:.1},sceneEnvironment:F,composerAddPass:"Saturate"},j={speed:.8,speedRot:.02,speedDown:-.45,offsetFromFloor:10,offsetFromFloorFactor:.5,offsetWallCollision:3.5,level:-13,startPos:[0,-45,150],cameraData:{fov:90,ratio:window.innerWidth/window.innerHeight,near:.1,far:1e4,pos:[0,2,-.5]},frontObjPos:[0,0,-1],backObjPos:[0,0,1],lightDataOne:{color:5592405,strength:1,dist:0,decay:.001,pos:[0,10,0]}},E=r(0),A=r(1),I=function(){function e(){Object(E.a)(this,e),this._storage={}}return Object(A.a)(e,[{key:"emit",value:function(e){var t=this;return function(r){return P(t._storage)(e).forEach((function(e){return e(r)}))}}},{key:"subscribe",value:function(e){var t=this;return function(r){return P(t._storage)(e).push(r),function(){return t._storage[e]=t._storage[e].filter((function(e){return e!==r}))}}}},{key:"showAll",value:function(){var e={};for(var t in this._storage)e[t]=this._storage[t].length;console.log(e)}}]),e}(),P=function(e){return function(t){return e[t]=e[t]||[]}},R=r(11),T=r(20),x=function(){function e(){var t=this;Object(E.a)(this,e),this._subscribers=[];var r={time:0,delta:0,count:0,oldTime:0},n=T.a((function(){return r}),(function(e){return e.time=Date.now(),e}),(function(e){return e.delta=.001*(e.time-e.oldTime),(isNaN(e.delta)||e.delta>1e3||0===e.delta)&&(e.delta=1e3/60*.001),e}),(function(e){return e.count=e.delta/(1/60),e}),(function(e){for(var r=0;r<t._subscribers.length;++r)t._subscribers[r](Object(R.a)({},e));return e}),(function(e){return e.oldTime=e.time,e}),(function(e){return r=e}));!function e(){requestAnimationFrame(e),n(r)}()}return Object(A.a)(e,[{key:"on",value:function(e){var t=this;return this._subscribers.push(e),function(){t._subscribers=t._subscribers.filter((function(t){return t!==e}))}}}]),e}(),B=r(7),K=r(12),W=function(){function e(t){var r=this;Object(E.a)(this,e),this._root=t;t.assets;var n=t.emitter,o=t.CONSTANTS.studioConfig,a=o.canId,i=o.rendererCon;i.canvas=document.getElementById(a),this._renderer=new u.s(i),this._renderer.setClearColor(0),this._renderer.setPixelRatio(window.devicePixelRatio),this._renderer.setSize(window.innerWidth,window.innerHeight),this._scene=new u.m,this._lightA=new u.a(7829367,2),this._scene.add(this._lightA);var s=new u.d(16777215,2);this._scene.add(s);var c=new u.j;this._scene.add(c),s.target=c,c.position.x=-1,this._playerCamera=new u.k(90,window.innerWidth/window.innerHeight,.1,5e3),this._controlsCamera=new u.k(90,window.innerWidth/window.innerHeight,.1,5e3),this._controlsCamera.position.set(0,500,-100);var l=new K.a(this._controlsCamera,this._renderer.domElement);l.target.set(0,0,0),l.update();var h=new u.r,p=!0,f=function(){p?(p=!1,r._playerCamera.getWorldPosition(h),l.update()):(p=!0,r._renderPass.camera=r._playerCamera)};n.subscribe("keyEvent")((function(e){e.o&&f()}));var d=function(){var e={width:window.innerWidth,height:window.innerHeight};r._renderer.setSize(e.width,e.height),r._controlsCamera&&(r._controlsCamera.aspect=e.width/e.height,r._controlsCamera.updateProjectionMatrix()),r._playerCamera&&(r._playerCamera.aspect=e.width/e.height,r._playerCamera.updateProjectionMatrix())};window.addEventListener("resize",d),d(),this.addToScene=function(e){return r._scene.add(e)},this.removeFromScene=function(e){return r._scene.remove(e)};var g=0;this.drawFrame=function(){g+=.01,s.position.x=5*Math.sin(g),s.position.z=5*Math.cos(g),r._renderer.render(r._scene,r._controlsCamera)},n.subscribe("changeSceneEnvironment")((function(e){console.log("deprecated!!","studio","changeSceneEnvironment",e)})),setTimeout((function(){f()}),200)}return Object(A.a)(e,[{key:"setCamera",value:function(e){e.aspect=window.innerWidth/window.innerHeight,e.updateProjectionMatrix(),this._playerCamera=e}},{key:"changeEnvironment",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;this._changeFog(e,t),this._changeBackground(e,t)}},{key:"_changeFog",value:function(e,t){}},{key:"_changeBackground",value:function(e){}}]),e}(),D=r(10),q=r(3);Float32Array;Math.random;var L=[[3,3,3,3],[3,2,2,3],[3,2,2,3],[3,3,3,3]],V=[[1,1,1,1],[1,1,1,1],[1,1,1,1],[1,1,1,1]],z=[[1,2,2,3],[1,2,2,3],[1,2,2,3],[1,2,2,3]],H=[[1,2,2,3],[2,2,2,3],[2,2,2,3],[3,3,3,3]],G=[[1,2,2,3],[2,2,2,2],[2,2,2,2],[3,2,2,1]],U=[[1,2,2,3],[2,2,2,3],[2,2,2,3],[3,2,2,3]],J=[[3,2,2,3],[2,2,2,3],[2,2,2,3],[1,2,2,3]],Q=[[3,2,2,1],[2,2,2,1],[2,2,2,1],[1,2,2,1]],Z=[[1,2,2,3],[2,2,2,3],[2,2,2,3],[1,2,2,3]],X=[[1,1,1,1],[2,2,2,1],[2,2,2,1],[1,2,2,1]],Y=[[1,2,2,1],[2,2,2,2],[2,2,2,2],[1,1,1,1]],$=[[3,2,2,3],[2,2,2,2],[2,2,2,2],[3,2,2,1]],ee=function(e){for(var t=[e],r=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]],n=0;n<r.length;++n)for(var o=0;o<r[n].length;++o)r[n][o]=e[3-n][3-o];t.push(r);for(var a=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]],i=0;i<a.length;++i)for(var s=0;s<a[i].length;++s)a[s][i]=e[i][s];t.push(a);for(var c=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]],u=0;u<c.length;++u)for(var l=0;l<c[u].length;++l)c[l][u]=e[u][3-l];return t.push(c),t},te=[];te.push(L,L,L,L),te.push(V,V,V,V),te.push.apply(te,Object(q.a)(ee(z))),te.push.apply(te,Object(q.a)(ee(H))),te.push.apply(te,Object(q.a)(ee(G))),te.push.apply(te,Object(q.a)(ee(U))),te.push.apply(te,Object(q.a)(ee(J))),te.push.apply(te,Object(q.a)(ee(Q))),te.push.apply(te,Object(q.a)(ee(Z))),te.push.apply(te,Object(q.a)(ee(X))),te.push.apply(te,Object(q.a)(ee(Y))),te.push.apply(te,Object(q.a)(ee($)));for(var re=function(e){for(var t=Object(q.a)(e[0]),r=Object(q.a)(e[3]),n=[],o=[],a=0;a<e.length;++a)n.push(e[a][0]),o.push(e[a][3]);return{tile:e,n:t,s:r,w:n,e:o}},ne=[],oe=0;oe<te.length;++oe)ne.push(re(te[oe]));var ae=[],ie=40,se=10,ce=80,ue=function(e,t,r){for(var n=[],o=[],a=0;a<e.length;++a)for(var i=0;i<e[a].length;++i){n.push(r*ie+i*se,e[a][i]*ce,t*ie+a*se,r*ie+i*se+se,e[a][i]*ce,t*ie+a*se,r*ie+i*se+se,e[a][i]*ce,t*ie+a*se+se,r*ie+i*se,e[a][i]*ce,t*ie+a*se,r*ie+i*se+se,e[a][i]*ce,t*ie+se+a*se,r*ie+i*se,e[a][i]*ce,t*ie+se+a*se);var s=.7*((e[a][i]-1)/2*.3+.3),c=[.5*s,0,1.5*s];if(o.push.apply(o,c.concat(c,c,c,c,c)),e[a+1]){n.push(r*ie+i*se,e[a+1][i]*ce,t*ie+a*se+se,r*ie+i*se+se,e[a+1][i]*ce,t*ie+a*se+se,r*ie+i*se+se,e[a][i]*ce,t*ie+a*se+se,r*ie+i*se,e[a+1][i]*ce,t*ie+a*se+se,r*ie+i*se+se,e[a][i]*ce,t*ie+a*se+se,r*ie+i*se,e[a][i]*ce,t*ie+a*se+se);var u=.7*((e[a][i]-1)/2*.3+.3),l=.7*((e[a+1][i]-1)/2*.3+.4),h=Math.max(u,l),p=[1.5*h,0,.5*h];o.push.apply(o,p.concat(p,p,p,p,p))}if(e[a][i+1]){n.push(r*ie+i*se+se,e[a][i+1]*ce,t*ie+a*se+se,r*ie+i*se+se,e[a][i+1]*ce,t*ie+a*se,r*ie+i*se+se,e[a][i]*ce,t*ie+a*se,r*ie+i*se+se,e[a][i+1]*ce,t*ie+a*se+se,r*ie+i*se+se,e[a][i]*ce,t*ie+a*se,r*ie+i*se+se,e[a][i]*ce,t*ie+a*se+se);var f=.7*((e[a][i]-1)/2*.3+.3),d=.7*((e[a][i+1]-1)/2*.3+.4),g=Math.max(f,d),v=[.3*g,1.5*g,.5*g];o.push.apply(o,v.concat(v,v,v,v,v))}}return{v:n,c:o}},le=[{key:"emitter",constr:I,initStateKey:"pageLoaded"},{key:"deviceResizer",constr:function e(t){Object(E.a)(this,e);var r=t.emitter,n=t.appWrapper;!n&&(n=document.querySelector(".app-wrapper")),r.subscribe("mouseDown")((function(e){"butt-fullscreen"===e&&o()}));var o=function(){n.requestFullscreen?n.requestFullscreen():n.mozRequestFullScreen?n.mozRequestFullScreen():n.webkitRequestFullscreen?n.webkitRequestFullscreen():n.msRequestFullscreen&&n.msRequestFullscreen()},a=function(e){n.style.width=window.innerWidth+"px",n.style.height=window.innerHeight+"px",n.style.fontSize=Math.max(Math.min(Math.min(window.innerWidth,window.innerHeight),400),350)/50+"px",document.fullscreenElement||r.emit("screenMode")("exitFullScreen")};window.addEventListener("resize",a),a()},initStateKey:"pageLoaded"},{key:"frameUpdater",constr:x,initStateKey:"beforeStartPlay"},{key:"studio",constr:W,initStateKey:"beforeStartPlay"},{key:"actions",constr:function e(t){Object(E.a)(this,e),this._root=t;for(var r=this._root,n=(r.dispatcher,r.frameUpdater),o=r.studio,a=(r.system_PlayerMoveOnLevel,r.ui,r.player,function(){for(var e=0;e<50;++e){for(var t=[],r=0;r<50;++r)t.push(10);ae.push(t)}for(var n=function(e,t){for(var r=0;r<e.length;++r)if(e[r]!==t[r])return!1;return!0},o=function(e,t){var r=0;ae[e][t-1]&&10!==ae[e][t-1]&&(r=ae[e][t-1].e);var o=0;ae[e][t+1]&&10!==ae[e][t+1]&&(o=ae[e][t-1].w);var a=0;ae[e-1]&&ae[e-1][t]&&10!==ae[e-1][t]&&(a=ae[e-1][t].s);var i=0;ae[e+1]&&ae[e+1][t]&&10!==ae[e+1][t]&&(i=ae[e+1][t].n);for(var s=Math.floor(Math.random()*ne.length),c=s;c<ne.length;++c){var u=!0;if(a&&!n(ne[c].n,a)&&(u=!1),i&&!n(ne[c].s,i)&&(u=!1),r&&!n(ne[c].w,r)&&(u=!1),o&&!n(ne[c].e,o)&&(u=!1),u)return ne[c]}for(var l=0;l<s;++l){var h=!0;if(a&&!n(ne[l].n,a)&&(h=!1),i&&!n(ne[l].s,i)&&(h=!1),r&&!n(ne[l].w,r)&&(h=!1),o&&!n(ne[l].e,o)&&(h=!1),h)return ne[l]}return 10},a=0;a<ae.length;++a)for(var i=0;i<ae[a].length;++i)if(10===ae[a][i]){var s=o(a,i);ae[a][i]=s}return ae}()),i=[],s=0;s<a.length;++s)for(var c=0;c<a[s].length;++c)i.push([s,c]);console.log(i);o.changeEnvironment(_,{time:1}),n.on((function(e){B.a(),o.drawFrame()})),function e(t){if(i[t]){var r=Object(D.a)(i[t],2),n=r[0],s=r[1],c=function(e){for(var t=[],r=[],n=0;n<e.length;++n)for(var o=0;o<e[n].length;++o)if(e[n][o].tile){var a=ue(e[n][o].tile,n,o);t.push.apply(t,Object(q.a)(a.v)),r.push.apply(r,Object(q.a)(a.c))}var i=new Float32Array(t),s=new u.c;s.setAttribute("position",new u.b(i,3)),s.computeVertexNormals();var c=new Float32Array(r);s.setAttribute("color",new u.b(c,3));var l=new u.h(s,new u.i({color:16777215,side:u.e,vertexColors:!0}));return l.position.set(0,-20,-200),l}([[a[n][s]]]);c.position.set(40*s,0,40*n),o.addToScene(c),setTimeout((function(){e(t+1)}),30)}}(0)},initStateKey:"beforeStartPlay"}];window.addEventListener("load",(function(){return function(e,t){return s.apply(this,arguments)}(le,n)}))}},[[15,1,2]]]);
//# sourceMappingURL=main.18a49010.chunk.js.map