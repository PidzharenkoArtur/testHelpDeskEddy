'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function (colorButton, position, icon, domain) {
    var Chat = function () {
        function Chat(colorButton, icon, position, domain, body) {
            _classCallCheck(this, Chat);

            this.colorButton = colorButton;
            this.icon = icon;
            this.position = position;
            this.domain = domain;

            this.body = body;
        }

        _createClass(Chat, [{
            key: 'init',
            value: function init() {
                var _this = this;

                var timeout = setTimeout(function () {
                    _this.drawСhat(_this.colorButton, _this.position, _this.icon);

                    clearTimeout(timeout);
                }, 2000);
            }
        }, {
            key: 'dragDropChat',
            value: function dragDropChat() {
                var topChat = document.querySelector("#chat .top-chat");

                topChat.onmousedown = function (e) {
                    var chat = e.target.parentNode;

                    var coords = getCoords(chat);
                    var shiftX = e.pageX - coords.left;
                    var shiftY = e.pageY - coords.top;

                    moveAt(e);

                    chat.style.zIndex = 1000;

                    function moveAt(e) {
                        chat.style.left = e.pageX - shiftX + 'px';
                        chat.style.top = e.pageY - shiftY + 'px';
                    }

                    document.onmousemove = function (e) {
                        moveAt(e);
                    };

                    chat.onmouseup = function () {
                        document.onmousemove = null;
                        chat.onmouseup = null;
                    };
                };

                topChat.ondragstart = function () {
                    return false;
                };

                function getCoords(elem) {
                    var box = elem.getBoundingClientRect();

                    return {
                        top: box.top + pageYOffset,
                        left: box.left + pageXOffset
                    };
                }
            }
        }, {
            key: 'draw\u0421hat',
            value: function drawHat(colorButton, position, icon) {
                var div = document.createElement('div');

                div.innerHTML = '<div id="chat">\n                <div class="chat-closed" style=\'cursor: pointer; display: flex; justify-content: center; align-items: center; width:65px;height:65px;border-radius: 50%; position: absolute; background:' + colorButton + '; ' + this.setStylePositionChat(position) + '\'>\n                    <div style="width:35px;" > ' + icon + '\n                    </div>\n                </div>\n           \n                <div class="iframe" style=\'visibility: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.5); width:300px; height:400px;position:absolute;' + this.setStylePositionChat(position) + '\'>\n                    <div style="cursor: pointer;position: absolute;height: 40px;width: 100%;" class="top-chat">\n                        \n                    </div>\n                    <svg class="close" style="cursor:pointer; color:white; position: absolute;top: 1px;right: 1px;width:24px;height:24px" viewBox="0 0 24 24">\n                            <path class="close" fill="currentColor" d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z" />\n                        </svg>\n                    <iframe src="https://chatwidget.helpdeskeddy.com/ru/omnichannel/chat" width="100%" height="400px" frameborder="0"></iframe> \n                </div>\n            </div>';

                this.body.appendChild(div);

                this.handlerEventBlockChat(div);
                this.handlerEventBlockChatFromIframe(div);

                this.dragDropChat();
            }
        }, {
            key: 'draw\u0421hatMobile',
            value: function drawHatMobile() {
                var width = document.documentElement.clientWidth;

                if (width < 820) {
                    var iframe = this.getElementIframe();

                    var arrPositions = this.position.split('-');

                    this.setPositionElement(iframe, 0);

                    iframe.style.width = '100%';
                }
            }

            /*handlerEvent*/

        }, {
            key: 'handlerEventBlockChat',
            value: function handlerEventBlockChat(div) {
                var _this2 = this;

                var listenerBlockChat = function listenerBlockChat(_ref) {
                    var target = _ref.target;

                    _this2.viewChat(target);
                };

                div.addEventListener("click", listenerBlockChat);
            }
        }, {
            key: 'handlerEventBlockChatFromIframe',
            value: function handlerEventBlockChatFromIframe(div) {
                var _this3 = this;

                window.onmessage = function (event) {
                    if (event.data == 'showChat') {
                        _this3.showIframe();
                    }
                    if (event.data == 'hiddenChat') {
                        _this3.hiddenIframe();
                    }
                };
            }
            /*handlerEvent*/

        }, {
            key: 'viewChat',
            value: function viewChat(target) {
                if (target.classList.contains("close")) {
                    this.hiddenIframe();

                    return;
                }

                this.drawСhatMobile();
                this.showIframe();
            }
        }, {
            key: 'getElementIframe',
            value: function getElementIframe() {
                return document.querySelector('#chat .iframe');
            }
        }, {
            key: 'getElementChatClosed',
            value: function getElementChatClosed() {
                return document.querySelector('#chat .chat-closed');
            }
        }, {
            key: 'showIframe',
            value: function showIframe() {
                var iframe = this.getElementIframe();
                var chatClosed = this.getElementChatClosed();

                iframe.style.visibility = 'visible';
                chatClosed.style.visibility = 'hidden';
            }
        }, {
            key: 'hiddenIframe',
            value: function hiddenIframe() {
                var iframe = this.getElementIframe();
                var chatClosed = this.getElementChatClosed();

                iframe.style.visibility = 'hidden';
                chatClosed.style.visibility = 'visible';

                this.setPositionElement(iframe, 10);
            }
        }, {
            key: 'setPositionElement',
            value: function setPositionElement(el, value) {
                var arrPositions = this.position.split('-');

                el.style.position = 'absolute';

                el.style.top = '';
                el.style.left = '';
                el.style.bottom = '';
                el.style.right = '';

                el.style[arrPositions[0]] = value + 'px';
                el.style[arrPositions[1]] = value + 'px';
            }
        }, {
            key: 'setStylePositionChat',
            value: function setStylePositionChat(position) {
                var arrPositions = position.split('-');

                return arrPositions[0] + ":10px;" + arrPositions[1] + ":10px;";
            }
        }]);

        return Chat;
    }();

    var chat = new Chat(colorButton, icon, position, domain, document.querySelector('body'));

    chat.init();
})('rgb(35, 134, 155)', 'top-left', /* или top-left, bottom-left, bottom-right */
'<svg color="inherit" class="lc-1mpchac" viewBox="0 0 32 32"><path fill="#000000" d="M12.63,26.46H8.83a6.61,6.61,0,0,1-6.65-6.07,89.05,89.05,0,0,1,0-11.2A6.5,6.5,0,0,1,8.23,3.25a121.62,121.62,0,0,1,15.51,0A6.51,6.51,0,0,1,29.8,9.19a77.53,77.53,0,0,1,0,11.2,6.61,6.61,0,0,1-6.66,6.07H19.48L12.63,31V26.46"></path><path fill="#FFD000" d="M19.57,21.68h3.67a2.08,2.08,0,0,0,2.11-1.81,89.86,89.86,0,0,0,0-10.38,1.9,1.9,0,0,0-1.84-1.74,113.15,113.15,0,0,0-15,0A1.9,1.9,0,0,0,6.71,9.49a74.92,74.92,0,0,0-.06,10.38,2,2,0,0,0,2.1,1.81h3.81V26.5Z" class="lc-p4hxbu e1nep2br0"></path></svg>', 'domain.com');