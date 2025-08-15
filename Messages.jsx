import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchThreads, fetchThread, sendMessage } from '../slices/chatSlice';

export default function Messages(){
  const dispatch = useDispatch();
  const { threads, current, status } = useSelector(s=>s.chat);
  const [text, setText] = useState('');
  const listRef = useRef(null);

  useEffect(()=>{ dispatch(fetchThreads()); }, [dispatch]);

  const open = (id)=> dispatch(fetchThread(id));

  const send = async ()=>{
    if (!current?._id || !text.trim()) return;
    await dispatch(sendMessage({ threadId: current._id, message: text }));
    setText('');
  };

  return (
    <div className="grid md:grid-cols-3 gap-4">
      <div className="card">
        <div className="font-semibold mb-2">Conversations</div>
        <div className="divide-y">
          {threads.map(t=>(
            <button key={t._id} className={`w-full text-left py-2 ${current?._id===t._id?'font-semibold':''}`} onClick={()=>open(t._id)}>
              {t.subject || (t.product?.title ? `About ${t.product.title}` : 'Conversation')}
              <div className="text-xs text-gray-500 truncate">{t.lastMessage?.message}</div>
            </button>
          ))}
        </div>
      </div>
      <div className="md:col-span-2 card flex flex-col h-[70vh]">
        <div className="font-semibold mb-2">Messages</div>
        <div ref={listRef} className="flex-1 overflow-auto flex flex-col-reverse gap-2">
          {current?.messages?.map((m)=>(
            <div key={m._id} className={`max-w-[80%] rounded-xl px-3 py-2 ${m.mine ? 'bg-black text-white self-end' : 'bg-gray-100 self-start'}`}>
              <div className="text-sm">{m.message}</div>
              <div className="text-[10px] opacity-60 mt-1">{new Date(m.createdAt).toLocaleString()}</div>
            </div>
          )) || <div className="text-gray-500 text-sm">Select a conversation.</div>}
        </div>
        <div className="mt-3 flex gap-2">
          <input className="input flex-1" placeholder="Type a message..." value={text} onChange={(e)=>setText(e.target.value)} />
          <button className="btn btn-primary" onClick={send}>Send</button>
        </div>
      </div>
    </div>
  );
}
