(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{322:function(module,exports){module.exports=function anonymous(locals,escapeFn,include,rethrow){rethrow=rethrow||function(e,n,a,t,r){var _=n.split("\n"),o=Math.max(t-3,0),s=Math.min(_.length,t+3),c=r(a),i=_.slice(o,s).map(function(e,n){var a=n+o+1;return(a==t?" >> ":"    ")+a+"| "+e}).join("\n");throw e.path=c,e.message=(c||"ejs")+":"+t+"\n"+i+"\n\n"+e.message,e},escapeFn=escapeFn||function(e){return void 0==e?"":String(e).replace(_MATCH_HTML,encode_char)};var _ENCODE_HTML_RULES={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&#34;","'":"&#39;"},_MATCH_HTML=/[&<>'"]/g;function encode_char(e){return _ENCODE_HTML_RULES[e]||e}var __line=1,__lines='<h1>First Page</h1>\n<div>\n    <a class="nav" data-href="/">Home Page</a><br>\n    <a class="nav" data-href="/second">Second Page</a><br>\n</div>\n',__filename="src/js/templates/first_page.ejs";try{var __output=[],__append=__output.push.bind(__output),echo=__append;with(locals||{})__append('<h1>First Page</h1>\n<div>\n    <a class="nav" data-href="/">Home Page</a><br>\n    <a class="nav" data-href="/second">Second Page</a><br>\n</div>\n'),__line=6;return __output.join("")}catch(e){rethrow(e,__lines,__filename,__line,escapeFn)}}}}]);