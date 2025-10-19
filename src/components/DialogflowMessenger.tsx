import { useEffect, useRef } from 'react';

const DialogflowMessenger = () => {
  const messengerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messengerRef.current && !messengerRef.current.querySelector('df-messenger')) {
      const messenger = document.createElement('df-messenger');
      messenger.setAttribute('intent', 'WELCOME');
      messenger.setAttribute('chat-title', 'ModuleTracker');
      messenger.setAttribute('agent-id', '252d29b8-c574-491f-8940-3cc3fac22f13');
      messenger.setAttribute('language-code', 'en');
      messengerRef.current.appendChild(messenger);
    }
  }, []);

  return <div ref={messengerRef} />;
};

export default DialogflowMessenger;
