(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleMessageNotifi = void 0;

// recevied new message event func
var handleMessageNotifi = function handleMessageNotifi(data) {
  var message = data.message;
  console.log("Client : ".concat(message));
};

exports.handleMessageNotifi = handleMessageNotifi;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNoYXQuanMiXSwibmFtZXMiOlsiaGFuZGxlTWVzc2FnZU5vdGlmaSIsImRhdGEiLCJtZXNzYWdlIiwiY29uc29sZSIsImxvZyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBO0FBQ08sSUFBTUEsbUJBQW1CLEdBQUcsU0FBdEJBLG1CQUFzQixDQUFBQyxJQUFJLEVBQUk7QUFBQSxNQUNqQ0MsT0FEaUMsR0FDckJELElBRHFCLENBQ2pDQyxPQURpQztBQUV6Q0MsRUFBQUEsT0FBTyxDQUFDQyxHQUFSLG9CQUF3QkYsT0FBeEI7QUFDRCxDQUhNIiwic291cmNlc0NvbnRlbnQiOlsiLy8gcmVjZXZpZWQgbmV3IG1lc3NhZ2UgZXZlbnQgZnVuY1xyXG5leHBvcnQgY29uc3QgaGFuZGxlTWVzc2FnZU5vdGlmaSA9IGRhdGEgPT4ge1xyXG4gIGNvbnN0IHsgbWVzc2FnZSB9ID0gZGF0YTtcclxuICBjb25zb2xlLmxvZyhgQ2xpZW50IDogJHttZXNzYWdlfWApO1xyXG59O1xyXG4iXX0=
},{}],2:[function(require,module,exports){
"use strict";

var _chat = require("./chat");

// eslint-disable-next-line no-undef
var socket = io("/"); // create new message event func

var sendMessage = function sendMessage(message) {
  socket.emit("newMessage", {
    message: message
  });
  console.log("Me : ".concat(message));
};

socket.on("messageNotifi", _chat.handleMessageNotifi); // Setting user nickname event func

var setNickname = function setNickname(nickname) {
  socket.emit("setNickname", {
    nickname: nickname
  });
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZha2VfYmIwMDAxMjguanMiXSwibmFtZXMiOlsic29ja2V0IiwiaW8iLCJzZW5kTWVzc2FnZSIsIm1lc3NhZ2UiLCJlbWl0IiwiY29uc29sZSIsImxvZyIsIm9uIiwiaGFuZGxlTWVzc2FnZU5vdGlmaSIsInNldE5pY2tuYW1lIiwibmlja25hbWUiXSwibWFwcGluZ3MiOiI7O0FBQUE7O0FBRUE7QUFDQSxJQUFNQSxNQUFNLEdBQUdDLEVBQUUsQ0FBQyxHQUFELENBQWpCLEMsQ0FFQTs7QUFDQSxJQUFNQyxXQUFXLEdBQUcsU0FBZEEsV0FBYyxDQUFBQyxPQUFPLEVBQUk7QUFDN0JILEVBQUFBLE1BQU0sQ0FBQ0ksSUFBUCxDQUFZLFlBQVosRUFBMEI7QUFBRUQsSUFBQUEsT0FBTyxFQUFQQTtBQUFGLEdBQTFCO0FBQ0FFLEVBQUFBLE9BQU8sQ0FBQ0MsR0FBUixnQkFBb0JILE9BQXBCO0FBQ0QsQ0FIRDs7QUFLQUgsTUFBTSxDQUFDTyxFQUFQLENBQVUsZUFBVixFQUEyQkMseUJBQTNCLEUsQ0FFQTs7QUFDQSxJQUFNQyxXQUFXLEdBQUcsU0FBZEEsV0FBYyxDQUFBQyxRQUFRLEVBQUk7QUFDOUJWLEVBQUFBLE1BQU0sQ0FBQ0ksSUFBUCxDQUFZLGFBQVosRUFBMkI7QUFBRU0sSUFBQUEsUUFBUSxFQUFSQTtBQUFGLEdBQTNCO0FBQ0QsQ0FGRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGhhbmRsZU1lc3NhZ2VOb3RpZmkgfSBmcm9tIFwiLi9jaGF0XCI7XHJcblxyXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcclxuY29uc3Qgc29ja2V0ID0gaW8oXCIvXCIpO1xyXG5cclxuLy8gY3JlYXRlIG5ldyBtZXNzYWdlIGV2ZW50IGZ1bmNcclxuY29uc3Qgc2VuZE1lc3NhZ2UgPSBtZXNzYWdlID0+IHtcclxuICBzb2NrZXQuZW1pdChcIm5ld01lc3NhZ2VcIiwgeyBtZXNzYWdlIH0pO1xyXG4gIGNvbnNvbGUubG9nKGBNZSA6ICR7bWVzc2FnZX1gKTtcclxufTtcclxuXHJcbnNvY2tldC5vbihcIm1lc3NhZ2VOb3RpZmlcIiwgaGFuZGxlTWVzc2FnZU5vdGlmaSk7XHJcblxyXG4vLyBTZXR0aW5nIHVzZXIgbmlja25hbWUgZXZlbnQgZnVuY1xyXG5jb25zdCBzZXROaWNrbmFtZSA9IG5pY2tuYW1lID0+IHtcclxuICBzb2NrZXQuZW1pdChcInNldE5pY2tuYW1lXCIsIHsgbmlja25hbWUgfSk7XHJcbn07XHJcbiJdfQ==
},{"./chat":1}]},{},[2])