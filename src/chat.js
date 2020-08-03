(function (colorButton, position, icon, domain) {

    class Chat {
        constructor(colorButton, icon, position,domain, body) {
            this.colorButton = colorButton;
            this.icon = icon;
            this.position = position;
            this.domain = domain;

            this.body = body;
        }

        init() {
            let timeout = setTimeout(()=> {
                this.drawСhat(this.colorButton, this.position, this.icon)
                
                clearTimeout(timeout);
            },2000)
        }

        dragDropChat() {
            let topChat = document.querySelector("#chat .top-chat")

            topChat.onmousedown = function(e) {
                let chat = e.target.parentNode

                let coords = getCoords(chat);
                let shiftX = e.pageX - coords.left;
                let shiftY = e.pageY - coords.top;
            
                moveAt(e);
            
                chat.style.zIndex = 1000;
            
                function moveAt(e) {
                    chat.style.left = e.pageX - shiftX + 'px';
                    chat.style.top = e.pageY - shiftY + 'px';
                }
            
                document.onmousemove = function(e) {
                    moveAt(e);
                };
            
                chat.onmouseup = function() {
                    document.onmousemove = null;
                    chat.onmouseup = null;
                };
            
            }
            
            topChat.ondragstart = function() {
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

        drawСhat(colorButton, position, icon) {
            let div = document.createElement('div')

            div.innerHTML=
            `<div id="chat">
                <div class="chat-closed" style='cursor: pointer; display: flex; justify-content: center; align-items: center; width:65px;height:65px;border-radius: 50%; position: absolute; background:`+ colorButton +`; `+ this.setStylePositionChat(position) +`'>
                    <div style="width:35px;" > `
                    +
                        icon
                    +
                    `
                    </div>
                </div>
           
                <div class="iframe" style='visibility: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.5); width:300px; height:400px;position:absolute;`+ this.setStylePositionChat(position) +`'>
                    <div style="cursor: pointer;position: absolute;height: 40px;width: 100%;" class="top-chat">
                        
                    </div>
                    <svg class="close" style="cursor:pointer; color:white; position: absolute;top: 1px;right: 1px;width:24px;height:24px" viewBox="0 0 24 24">
                            <path class="close" fill="currentColor" d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z" />
                        </svg>
                    <iframe src="https://chatwidget.helpdeskeddy.com/ru/omnichannel/chat" width="100%" height="400px" frameborder="0"></iframe> 
                </div>
            </div>`

            this.body.appendChild(div)

            this.handlerEventBlockChat(div)
            this.handlerEventBlockChatFromIframe(div)

            this.dragDropChat()
        }

        drawСhatMobile() {
            let width = document.documentElement.clientWidth;

            if (width < 820) {
                let iframe = this.getElementIframe()

                let arrPositions = this.position.split('-')

                this.setPositionElement(iframe, 0)
                
                iframe.style.width = '100%'
            }
        }

        /*handlerEvent*/
        handlerEventBlockChat(div) {

            let listenerBlockChat = ({target}) => {
                this.viewChat(target)
            };

            div.addEventListener("click", listenerBlockChat)
        }

        handlerEventBlockChatFromIframe(div) {
            window.onmessage = (event) => {
                if (event.data == 'showChat') {
                    this.showIframe()
                }
                if (event.data == 'hiddenChat') {
                    this.hiddenIframe()
                }
            };
        }
        /*handlerEvent*/

        viewChat (target) {
            if (target.classList.contains("close")) {
                this.hiddenIframe()

                return
            }

            this.drawСhatMobile()
            this.showIframe()
        }

        getElementIframe() {
            return document.querySelector('#chat .iframe')
        }

        getElementChatClosed() {
            return document.querySelector('#chat .chat-closed')
        }

        showIframe() {
            let iframe = this.getElementIframe()
            let chatClosed = this.getElementChatClosed()

            iframe.style.visibility = 'visible'
            chatClosed.style.visibility = 'hidden'
        }

        hiddenIframe() {
            let iframe = this.getElementIframe()
            let chatClosed = this.getElementChatClosed()

            iframe.style.visibility = 'hidden'
            chatClosed.style.visibility = 'visible'

            this.setPositionElement(iframe, 10)
        }

        setPositionElement(el, value) {
            let arrPositions = this.position.split('-')

            el.style.position = 'absolute'

            el.style.top= ''
            el.style.left= ''
            el.style.bottom= ''
            el.style.right= ''

            el.style[arrPositions[0]] = value + 'px'
            el.style[arrPositions[1]]= value + 'px'
        }

        setStylePositionChat(position) {
            let arrPositions = position.split('-')

            return arrPositions[0] +":10px;" + arrPositions[1] +":10px;"
        }
    }

    let chat = new Chat(
        colorButton, 
        icon, 
        position, 
        domain,

        document.querySelector('body'),
    )

    chat.init()
})(
    'rgb(35, 134, 155)',
    'top-left', /* или top-left, bottom-left, bottom-right */
    '<svg color="inherit" class="lc-1mpchac" viewBox="0 0 32 32"><path fill="#000000" d="M12.63,26.46H8.83a6.61,6.61,0,0,1-6.65-6.07,89.05,89.05,0,0,1,0-11.2A6.5,6.5,0,0,1,8.23,3.25a121.62,121.62,0,0,1,15.51,0A6.51,6.51,0,0,1,29.8,9.19a77.53,77.53,0,0,1,0,11.2,6.61,6.61,0,0,1-6.66,6.07H19.48L12.63,31V26.46"></path><path fill="#FFD000" d="M19.57,21.68h3.67a2.08,2.08,0,0,0,2.11-1.81,89.86,89.86,0,0,0,0-10.38,1.9,1.9,0,0,0-1.84-1.74,113.15,113.15,0,0,0-15,0A1.9,1.9,0,0,0,6.71,9.49a74.92,74.92,0,0,0-.06,10.38,2,2,0,0,0,2.1,1.81h3.81V26.5Z" class="lc-p4hxbu e1nep2br0"></path></svg>',
    'domain.com'
);