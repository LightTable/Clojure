if(!lt.util.load.provided_QMARK_('lt.plugins.clojure.nrepl')) {
goog.provide('lt.plugins.clojure.nrepl');
goog.require('cljs.core');
goog.require('lt.util.cljs');
goog.require('lt.util.load');
goog.require('lt.util.js');
goog.require('lt.objs.files');
goog.require('lt.util.js');
goog.require('cljs.reader');
goog.require('lt.objs.notifos');
goog.require('lt.objs.notifos');
goog.require('lt.util.cljs');
goog.require('lt.objs.files');
goog.require('lt.objs.clients');
goog.require('lt.object');
goog.require('cljs.reader');
goog.require('lt.object');
goog.require('lt.util.load');
goog.require('lt.objs.console');
goog.require('lt.objs.console');
goog.require('lt.objs.clients');
lt.plugins.clojure.nrepl.bencode = lt.util.load.node_module.call(null,"bencode");
lt.plugins.clojure.nrepl.Buffer = require("buffer");
lt.plugins.clojure.nrepl.net = require("net");
lt.plugins.clojure.nrepl.encode = (function encode(msg){return lt.plugins.clojure.nrepl.bencode.encode(cljs.core.clj__GT_js.call(null,msg));
});
lt.plugins.clojure.nrepl.create_buffer = (function create_buffer(size){var b = lt.plugins.clojure.nrepl.Buffer.Buffer;return (new b(size));
});
lt.plugins.clojure.nrepl.decode = (function decode(client,failed_recently_QMARK_){var buffer = new cljs.core.Keyword(null,"buffer","buffer",3930752946).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,client));var msg = cljs.core.deref.call(null,buffer);var msgs = [];var msg_6714__$1 = msg;while(true){
if((msg_6714__$1.length <= 0))
{cljs.core.reset_BANG_.call(null,buffer,null);
} else
{try{var neue_6715 = cljs.core.js__GT_clj.call(null,lt.plugins.clojure.nrepl.bencode.decode(msg_6714__$1,"utf-8"),new cljs.core.Keyword(null,"keywordize-keys","keywordize-keys",4191781672),true);var pos_6716 = lt.plugins.clojure.nrepl.bencode.decode.position;msgs.push(neue_6715);
if(cljs.core.truth_((function (){var and__4872__auto__ = pos_6716;if(cljs.core.truth_(and__4872__auto__))
{return (pos_6716 >= msg_6714__$1.length);
} else
{return and__4872__auto__;
}
})()))
{cljs.core.reset_BANG_.call(null,buffer,null);
} else
{{
var G__6717 = msg_6714__$1.slice(pos_6716);
msg_6714__$1 = G__6717;
continue;
}
}
}catch (e6703){if((e6703 instanceof global.Error))
{var e_6718 = e6703;cljs.core.reset_BANG_.call(null,failed_recently_QMARK_,true);
cljs.core.reset_BANG_.call(null,buffer,msg_6714__$1);
setTimeout(((function (msg_6714__$1,e_6718,buffer,msg,msgs){
return (function (){cljs.core.reset_BANG_.call(null,failed_recently_QMARK_,false);
return decode.call(null,client,failed_recently_QMARK_);
});})(msg_6714__$1,e_6718,buffer,msg,msgs))
,50);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e6703;
} else
{}
}
}}
break;
}
lt.plugins.clojure.nrepl.queue = lt.plugins.clojure.nrepl.queue.concat(msgs);
if(cljs.core.truth_(lt.plugins.clojure.nrepl.running_QMARK_))
{return null;
} else
{lt.plugins.clojure.nrepl.running_QMARK_ = true;
return lt.plugins.clojure.nrepl.non_blocking_loop.call(null,client);
}
});
lt.plugins.clojure.nrepl.maybe_decode = (function maybe_decode(client,failed_recently_QMARK_,data){cljs.core.swap_BANG_.call(null,new cljs.core.Keyword(null,"buffer","buffer",3930752946).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,client)),(function (p1__6704_SHARP_){if(cljs.core.truth_(p1__6704_SHARP_))
{return lt.plugins.clojure.nrepl.Buffer.Buffer.concat([p1__6704_SHARP_,data]);
} else
{return data;
}
}));
if(cljs.core.truth_(cljs.core.deref.call(null,failed_recently_QMARK_)))
{return null;
} else
{return lt.plugins.clojure.nrepl.decode.call(null,client,failed_recently_QMARK_);
}
});
lt.plugins.clojure.nrepl.queue = [];
lt.plugins.clojure.nrepl.queue_index = 0;
lt.plugins.clojure.nrepl.running_QMARK_ = false;
lt.plugins.clojure.nrepl.non_blocking_loop = (function non_blocking_loop(client){if((lt.plugins.clojure.nrepl.queue_index > 20))
{lt.plugins.clojure.nrepl.queue.splice(0,lt.plugins.clojure.nrepl.queue_index);
lt.plugins.clojure.nrepl.queue_index = 0;
} else
{}
try{lt.object.raise.call(null,client,new cljs.core.Keyword("lt.plugins.clojure.nrepl","message","lt.plugins.clojure.nrepl/message",2775308209),(lt.plugins.clojure.nrepl.queue[lt.plugins.clojure.nrepl.queue_index]));
}catch (e6706){var e_6719 = e6706;lt.objs.console.error.call(null,e_6719);
}if((lt.plugins.clojure.nrepl.queue_index >= lt.plugins.clojure.nrepl.queue.length))
{lt.plugins.clojure.nrepl.running_QMARK_ = false;
lt.plugins.clojure.nrepl.queue_index = 0;
return lt.plugins.clojure.nrepl.queue = [];
} else
{return global.setImmediate((function (){lt.plugins.clojure.nrepl.queue_index = (lt.plugins.clojure.nrepl.queue_index + 1);
return non_blocking_loop.call(null,client);
}));
}
});
lt.plugins.clojure.nrepl.connect_to = (function connect_to(host,port,client){var socket = lt.plugins.clojure.nrepl.net.connect(port,host);var failed_recently_QMARK_ = cljs.core.atom.call(null,false);socket.on("connect",((function (socket,failed_recently_QMARK_){
return (function (){if(cljs.core.truth_(cljs.core.deref.call(null,client)))
{return lt.object.raise.call(null,client,new cljs.core.Keyword("lt.plugins.clojure.nrepl","connect","lt.plugins.clojure.nrepl/connect",2771734158));
} else
{return null;
}
});})(socket,failed_recently_QMARK_))
);
socket.on("error",((function (socket,failed_recently_QMARK_){
return (function (){if(cljs.core.truth_(cljs.core.deref.call(null,client)))
{return lt.object.raise.call(null,client,new cljs.core.Keyword("lt.plugins.clojure.nrepl","connect-fail","lt.plugins.clojure.nrepl/connect-fail",1808743639));
} else
{return null;
}
});})(socket,failed_recently_QMARK_))
);
socket.on("data",((function (socket,failed_recently_QMARK_){
return (function (p1__6707_SHARP_){if(cljs.core.truth_(cljs.core.deref.call(null,client)))
{return lt.plugins.clojure.nrepl.maybe_decode.call(null,client,failed_recently_QMARK_,p1__6707_SHARP_);
} else
{return null;
}
});})(socket,failed_recently_QMARK_))
);
socket.on("close",((function (socket,failed_recently_QMARK_){
return (function (){if(cljs.core.truth_(cljs.core.deref.call(null,client)))
{return lt.object.raise.call(null,client,new cljs.core.Keyword(null,"close!","close!",3951350939));
} else
{return null;
}
});})(socket,failed_recently_QMARK_))
);
return socket;
});
lt.plugins.clojure.nrepl.__BEH__nrepl_connect = (function __BEH__nrepl_connect(this$){lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"buffer","buffer",3930752946),cljs.core.atom.call(null,null)], null));
return lt.plugins.clojure.nrepl.send_STAR_.call(null,this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"op","op",1013907795),"clone"], null));
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure.nrepl","nrepl-connect","lt.plugins.clojure.nrepl/nrepl-connect",2355993470),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.nrepl.__BEH__nrepl_connect,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("lt.plugins.clojure.nrepl","connect","lt.plugins.clojure.nrepl/connect",2771734158),null], null), null));
lt.plugins.clojure.nrepl.__BEH__init_remote_session = (function __BEH__init_remote_session(this$,session){lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"session","session",2998892040),session], null));
return lt.plugins.clojure.nrepl.send.call(null,this$,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"op","op",1013907795),"client.init",new cljs.core.Keyword(null,"id","id",1013907597),lt.objs.clients.__GT_id.call(null,this$),new cljs.core.Keyword(null,"data","data",1016980252),cljs.core.pr_str.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"settings","settings",2448535445),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"name","name",1017277949),new cljs.core.Keyword(null,"name","name",1017277949).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)),new cljs.core.Keyword(null,"remote","remote",4374260664),true,new cljs.core.Keyword(null,"client-id","client-id",3404733903),lt.objs.clients.__GT_id.call(null,this$)], null)], null))], null));
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure.nrepl","init-remote-session","lt.plugins.clojure.nrepl/init-remote-session",3268876556),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.nrepl.__BEH__init_remote_session,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"new-session","new-session",1013080795),null], null), null));
lt.plugins.clojure.nrepl.__BEH__client__DOT__settings__DOT__remote = (function __BEH__client__DOT__settings__DOT__remote(this$,info){lt.objs.clients.handle_connection_BANG_.call(null,info);
return lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"dir","dir",1014003711),null], null));
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure.nrepl","client.settings.remote","lt.plugins.clojure.nrepl/client.settings.remote",584283882),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.nrepl.__BEH__client__DOT__settings__DOT__remote,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"client.settings","client.settings",3356017240),null], null), null));
lt.plugins.clojure.nrepl.__BEH__nrepl_send_BANG_ = (function __BEH__nrepl_send_BANG_(this$,msg){return lt.plugins.clojure.nrepl.send.call(null,this$,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"op","op",1013907795),new cljs.core.Keyword(null,"command","command",1964298941).cljs$core$IFn$_invoke$arity$1(msg),new cljs.core.Keyword(null,"id","id",1013907597),(function (){var or__4884__auto__ = new cljs.core.Keyword(null,"cb","cb",1013907409).cljs$core$IFn$_invoke$arity$1(msg);if(cljs.core.truth_(or__4884__auto__))
{return or__4884__auto__;
} else
{return 0;
}
})(),new cljs.core.Keyword(null,"data","data",1016980252),cljs.core.pr_str.call(null,new cljs.core.Keyword(null,"data","data",1016980252).cljs$core$IFn$_invoke$arity$1(msg))], null));
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure.nrepl","nrepl-send!","lt.plugins.clojure.nrepl/nrepl-send!",3312223823),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.nrepl.__BEH__nrepl_send_BANG_,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"send!","send!",1123226891),null], null), null));
lt.plugins.clojure.nrepl.__BEH__client__DOT__settings = (function __BEH__client__DOT__settings(this$,info){return lt.objs.clients.handle_connection_BANG_.call(null,info);
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure.nrepl","client.settings","lt.plugins.clojure.nrepl/client.settings",1880262802),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.nrepl.__BEH__client__DOT__settings,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"client.settings","client.settings",3356017240),null], null), null));
lt.plugins.clojure.nrepl.__BEH__init_session = (function __BEH__init_session(this$,session){lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"session","session",2998892040),session], null));
return lt.plugins.clojure.nrepl.send.call(null,this$,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"op","op",1013907795),"client.init",new cljs.core.Keyword(null,"id","id",1013907597),lt.objs.clients.__GT_id.call(null,this$),new cljs.core.Keyword(null,"data","data",1016980252),cljs.core.pr_str.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"settings","settings",2448535445),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"client-id","client-id",3404733903),lt.objs.clients.__GT_id.call(null,this$),new cljs.core.Keyword(null,"dir","dir",1014003711),new cljs.core.Keyword(null,"dir","dir",1014003711).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$))], null)], null))], null));
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure.nrepl","init-session","lt.plugins.clojure.nrepl/init-session",2694943839),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.nrepl.__BEH__init_session,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"new-session","new-session",1013080795),null], null), null));
lt.plugins.clojure.nrepl.__BEH__nrepl_message = (function __BEH__nrepl_message(this$,msg){var op = new cljs.core.Keyword(null,"op","op",1013907795).cljs$core$IFn$_invoke$arity$1(msg);var encoding = new cljs.core.Keyword(null,"encoding","encoding",2725126341).cljs$core$IFn$_invoke$arity$1(msg);var info = (cljs.core.truth_(new cljs.core.Keyword(null,"data","data",1016980252).cljs$core$IFn$_invoke$arity$1(msg))?(function (){var pred__6711 = cljs.core._EQ_;var expr__6712 = encoding;if(cljs.core.truth_(pred__6711.call(null,"edn",expr__6712)))
{return cljs.reader.read_string.call(null,new cljs.core.Keyword(null,"data","data",1016980252).cljs$core$IFn$_invoke$arity$1(msg));
} else
{if(cljs.core.truth_(pred__6711.call(null,"json",expr__6712)))
{return JSON.parse(new cljs.core.Keyword(null,"data","data",1016980252).cljs$core$IFn$_invoke$arity$1(msg));
} else
{return cljs.reader.read_string.call(null,new cljs.core.Keyword(null,"data","data",1016980252).cljs$core$IFn$_invoke$arity$1(msg));
}
}
})():null);if(cljs.core.truth_(new cljs.core.Keyword(null,"new-session","new-session",1013080795).cljs$core$IFn$_invoke$arity$1(msg)))
{lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"new-session","new-session",1013080795),new cljs.core.Keyword(null,"new-session","new-session",1013080795).cljs$core$IFn$_invoke$arity$1(msg));
} else
{}
if(cljs.core.truth_(cljs.core.set.call(null,new cljs.core.Keyword(null,"status","status",4416389988).cljs$core$IFn$_invoke$arity$1(msg)).call(null,"interrupted")))
{lt.objs.notifos.done_working.call(null);
} else
{}
if(cljs.core.truth_(op))
{if(cljs.core.truth_(lt.util.cljs.str_contains_QMARK_.call(null,op,"client.")))
{return lt.object.raise.call(null,this$,cljs.core.keyword.call(null,op),info);
} else
{return lt.object.raise.call(null,lt.objs.clients.clients,new cljs.core.Keyword(null,"message","message",1968829305),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"id","id",1013907597).cljs$core$IFn$_invoke$arity$1(msg),op,info], null));
}
} else
{return null;
}
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure.nrepl","nrepl-message","lt.plugins.clojure.nrepl/nrepl-message",2359567521),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.nrepl.__BEH__nrepl_message,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("lt.plugins.clojure.nrepl","message","lt.plugins.clojure.nrepl/message",2775308209),null], null), null));
lt.plugins.clojure.nrepl.__BEH__try_connect_BANG_ = (function __BEH__try_connect_BANG_(this$,info){if(cljs.core.truth_(new cljs.core.Keyword(null,"port","port",1017351155).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$))))
{return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"connect!","connect!",4735997929));
} else
{return null;
}
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure.nrepl","try-connect!","lt.plugins.clojure.nrepl/try-connect!",2875727599),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.nrepl.__BEH__try_connect_BANG_,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"try-connect!","try-connect!",1801329595),null], null), null));
lt.plugins.clojure.nrepl.__BEH__connect_BANG_ = (function __BEH__connect_BANG_(this$){return lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"socket","socket",4411822821),lt.plugins.clojure.nrepl.connect_to.call(null,new cljs.core.Keyword(null,"host","host",1017112858).cljs$core$IFn$_invoke$arity$2(cljs.core.deref.call(null,this$),"localhost"),new cljs.core.Keyword(null,"port","port",1017351155).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)),this$)], null));
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure.nrepl","connect!","lt.plugins.clojure.nrepl/connect!",1515952897),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.nrepl.__BEH__connect_BANG_,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"connect!","connect!",4735997929),null], null), null));
lt.plugins.clojure.nrepl.__BEH__close = (function __BEH__close(this$){return lt.objs.clients.rem_BANG_.call(null,this$);
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure.nrepl","close","lt.plugins.clojure.nrepl/close",4196858240),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.nrepl.__BEH__close,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"close!","close!",3951350939),null], null), null));
lt.plugins.clojure.nrepl.send_STAR_ = (function send_STAR_(client,msg){var c = lt.plugins.clojure.nrepl.encode.call(null,msg);return new cljs.core.Keyword(null,"socket","socket",4411822821).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,client)).write(c);
});
lt.plugins.clojure.nrepl.send = (function send(client,msg){var session = new cljs.core.Keyword(null,"session","session",2998892040).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,client));var msg__$1 = cljs.core.merge.call(null,(cljs.core.truth_(session)?new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"session","session",2998892040),session], null):null),msg);return lt.plugins.clojure.nrepl.send_STAR_.call(null,client,msg__$1);
});
}
if(!lt.util.load.provided_QMARK_('lt.plugins.clojure')) {
goog.provide('lt.plugins.clojure');
goog.require('cljs.core');
goog.require('lt.util.cljs');
goog.require('lt.objs.plugins');
goog.require('lt.objs.files');
goog.require('lt.util.js');
goog.require('lt.util.dom');
goog.require('lt.objs.context');
goog.require('lt.objs.platform');
goog.require('lt.objs.tabs');
goog.require('lt.objs.popup');
goog.require('lt.objs.dialogs');
goog.require('lt.objs.popup');
goog.require('lt.plugins.auto_complete');
goog.require('cljs.reader');
goog.require('lt.objs.context');
goog.require('lt.objs.notifos');
goog.require('lt.objs.proc');
goog.require('lt.objs.notifos');
goog.require('lt.util.dom');
goog.require('lt.objs.editor.pool');
goog.require('clojure.string');
goog.require('lt.util.cljs');
goog.require('lt.objs.command');
goog.require('lt.objs.platform');
goog.require('lt.objs.files');
goog.require('lt.objs.sidebar.clients');
goog.require('lt.objs.plugins');
goog.require('lt.plugins.auto_complete');
goog.require('lt.plugins.watches');
goog.require('lt.objs.eval');
goog.require('lt.objs.clients');
goog.require('lt.util.load');
goog.require('clojure.string');
goog.require('lt.plugins.watches');
goog.require('lt.objs.deploy');
goog.require('lt.objs.editor');
goog.require('lt.object');
goog.require('cljs.reader');
goog.require('lt.object');
goog.require('lt.objs.dialogs');
goog.require('lt.util.load');
goog.require('lt.objs.console');
goog.require('lt.objs.proc');
goog.require('lt.objs.tabs');
goog.require('lt.objs.console');
goog.require('lt.util.js');
goog.require('lt.objs.eval');
goog.require('lt.objs.clients');
goog.require('lt.objs.editor.pool');
goog.require('lt.objs.sidebar.clients');
goog.require('lt.objs.command');
goog.require('lt.objs.deploy');
goog.require('lt.objs.editor');
lt.plugins.clojure.shell = lt.util.load.node_module.call(null,"shelljs");
lt.plugins.clojure.cur_path = lt.plugins.clojure.shell.pwd();
lt.plugins.clojure.local_project_clj = lt.objs.files.join.call(null,lt.objs.plugins._STAR_plugin_dir_STAR_,"runner/resources/project.clj");
lt.plugins.clojure.jar_path = lt.objs.files.join.call(null,lt.objs.plugins._STAR_plugin_dir_STAR_,"runner/target/lein-light-standalone.jar");
lt.plugins.clojure.__BEH__highlight_comment_forms = (function __BEH__highlight_comment_forms(this$){var temp__4092__auto__ = lt.objs.editor.inner_mode.call(null,this$);if(cljs.core.truth_(temp__4092__auto__))
{var m = temp__4092__auto__;return m.commentForms = true;
} else
{return null;
}
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure","highlight-comment-forms","lt.plugins.clojure/highlight-comment-forms",868884694),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.__BEH__highlight_comment_forms,new cljs.core.Keyword(null,"desc","desc",1016984067),"Clojure: Highlight comment forms as comments",new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"object.instant","object.instant",773332388),null], null), null),new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"user","user",1017503549));
lt.plugins.clojure.local_name = "LightTable-REPL";
lt.plugins.clojure.unescape_unicode = (function unescape_unicode(s){if(typeof s === 'string')
{return clojure.string.replace.call(null,s,/\\x(..)/,(function (res,r){return String.fromCharCode(parseInt(r,16));
}));
} else
{return null;
}
});
lt.plugins.clojure.try_connect = (function try_connect(p__6720){var map__6723 = p__6720;var map__6723__$1 = ((cljs.core.seq_QMARK_.call(null,map__6723))?cljs.core.apply.call(null,cljs.core.hash_map,map__6723):map__6723);var info = cljs.core.get.call(null,map__6723__$1,new cljs.core.Keyword(null,"info","info",1017141280));var path = new cljs.core.Keyword(null,"path","path",1017337751).cljs$core$IFn$_invoke$arity$1(info);var map__6724 = (cljs.core.truth_(path)?lt.plugins.clojure.find_project.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"path","path",1017337751),path], null)):null);var map__6724__$1 = ((cljs.core.seq_QMARK_.call(null,map__6724))?cljs.core.apply.call(null,cljs.core.hash_map,map__6724):map__6724);var project_path = cljs.core.get.call(null,map__6724__$1,new cljs.core.Keyword(null,"project-path","project-path",1907176907));if(cljs.core.truth_(project_path))
{return lt.plugins.clojure.check_all.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"path","path",1017337751),path,new cljs.core.Keyword(null,"client","client",3951159101),lt.objs.clients.client_BANG_.call(null,new cljs.core.Keyword(null,"nrepl.client","nrepl.client",4747318638))], null));
} else
{var or__4884__auto__ = lt.objs.clients.by_name.call(null,lt.plugins.clojure.local_name);if(cljs.core.truth_(or__4884__auto__))
{return or__4884__auto__;
} else
{return lt.plugins.clojure.run_local_server.call(null,lt.objs.clients.client_BANG_.call(null,new cljs.core.Keyword(null,"nrepl.client","nrepl.client",4747318638)));
}
}
});
lt.plugins.clojure.__BEH__on_eval__DOT__clj = (function __BEH__on_eval__DOT__clj(editor){return lt.object.raise.call(null,lt.plugins.clojure.clj_lang,new cljs.core.Keyword(null,"eval!","eval!",1110791799),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"origin","origin",4300251800),editor,new cljs.core.Keyword(null,"info","info",1017141280),cljs.core.assoc.call(null,cljs.core.deref.call(null,editor).call(null,new cljs.core.Keyword(null,"info","info",1017141280)),new cljs.core.Keyword(null,"print-length","print-length",3960797560),lt.object.raise_reduce.call(null,editor,new cljs.core.Keyword(null,"clojure.print-length+","clojure.print-length+",4366367949),null),new cljs.core.Keyword(null,"code","code",1016963423),lt.plugins.watches.watched_range.call(null,editor,null,null,null))], null));
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure","on-eval.clj","lt.plugins.clojure/on-eval.clj",1491161131),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.__BEH__on_eval__DOT__clj,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"eval","eval",1017029646),null], null), null));
lt.plugins.clojure.__BEH__on_eval__DOT__cljs = (function __BEH__on_eval__DOT__cljs(editor){return lt.object.raise.call(null,lt.plugins.clojure.clj_lang,new cljs.core.Keyword(null,"eval!","eval!",1110791799),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"origin","origin",4300251800),editor,new cljs.core.Keyword(null,"info","info",1017141280),cljs.core.assoc.call(null,cljs.core.deref.call(null,editor).call(null,new cljs.core.Keyword(null,"info","info",1017141280)),new cljs.core.Keyword(null,"print-length","print-length",3960797560),lt.object.raise_reduce.call(null,editor,new cljs.core.Keyword(null,"clojure.print-length+","clojure.print-length+",4366367949),null),new cljs.core.Keyword(null,"code","code",1016963423),[cljs.core.str("(set! js/COMPILED-temp js/COMPILED) (set! js/COMPILED true) "),cljs.core.str(lt.plugins.watches.watched_range.call(null,editor,null,null,null)),cljs.core.str("(set! js/COMPILED js/COMPILED-temp)")].join(''))], null));
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure","on-eval.cljs","lt.plugins.clojure/on-eval.cljs",4578527780),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.__BEH__on_eval__DOT__cljs,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"eval","eval",1017029646),null], null), null));
lt.plugins.clojure.__BEH__on_eval__DOT__one = (function __BEH__on_eval__DOT__one(editor){var code = lt.plugins.watches.watched_range.call(null,editor,null,null,null);var pos = lt.objs.editor.__GT_cursor.call(null,editor);var info = new cljs.core.Keyword(null,"info","info",1017141280).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,editor));var info__$1 = (cljs.core.truth_(lt.objs.editor.selection_QMARK_.call(null,editor))?cljs.core.assoc.call(null,info,new cljs.core.Keyword(null,"code","code",1016963423),lt.objs.editor.selection.call(null,editor),new cljs.core.Keyword(null,"meta","meta",1017252215),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"start","start",1123661780),new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(lt.objs.editor.__GT_cursor.call(null,editor,"start")),new cljs.core.Keyword(null,"end","end",1014004813),new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(lt.objs.editor.__GT_cursor.call(null,editor,"end"))], null)):cljs.core.assoc.call(null,info,new cljs.core.Keyword(null,"pos","pos",1014015430),pos,new cljs.core.Keyword(null,"code","code",1016963423),code));var info__$2 = cljs.core.assoc.call(null,info__$1,new cljs.core.Keyword(null,"print-length","print-length",3960797560),lt.object.raise_reduce.call(null,editor,new cljs.core.Keyword(null,"clojure.print-length+","clojure.print-length+",4366367949),null));return lt.object.raise.call(null,lt.plugins.clojure.clj_lang,new cljs.core.Keyword(null,"eval!","eval!",1110791799),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"origin","origin",4300251800),editor,new cljs.core.Keyword(null,"info","info",1017141280),info__$2], null));
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure","on-eval.one","lt.plugins.clojure/on-eval.one",1491055984),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.__BEH__on_eval__DOT__one,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"eval.one","eval.one",1173589382),null], null), null));
lt.plugins.clojure.fill_placeholders = (function fill_placeholders(editor,exp){return clojure.string.replace.call(null,clojure.string.replace.call(null,exp,"__SELECTION*__",cljs.core.pr_str.call(null,lt.objs.editor.selection.call(null,editor))),"__SELECTION__",lt.objs.editor.selection.call(null,editor));
});
lt.plugins.clojure.__BEH__on_eval__DOT__custom = (function __BEH__on_eval__DOT__custom(editor,exp,opts){var code = lt.plugins.clojure.fill_placeholders.call(null,editor,exp);var pos = lt.objs.editor.__GT_cursor.call(null,editor);var info = new cljs.core.Keyword(null,"info","info",1017141280).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,editor));var info__$1 = cljs.core.assoc.call(null,info,new cljs.core.Keyword(null,"code","code",1016963423),code,new cljs.core.Keyword(null,"ns","ns",1013907767),(function (){var or__4884__auto__ = new cljs.core.Keyword(null,"ns","ns",1013907767).cljs$core$IFn$_invoke$arity$1(opts);if(cljs.core.truth_(or__4884__auto__))
{return or__4884__auto__;
} else
{return new cljs.core.Keyword(null,"ns","ns",1013907767).cljs$core$IFn$_invoke$arity$1(info);
}
})(),new cljs.core.Keyword(null,"meta","meta",1017252215),cljs.core.merge.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"start","start",1123661780),new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(lt.objs.editor.__GT_cursor.call(null,editor,"start")),new cljs.core.Keyword(null,"end","end",1014004813),new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(lt.objs.editor.__GT_cursor.call(null,editor,"end")),new cljs.core.Keyword(null,"result-type","result-type",4725630556),new cljs.core.Keyword(null,"inline","inline",4124874251),new cljs.core.Keyword(null,"trigger","trigger",4248979754),new cljs.core.Keyword(null,"return","return",4374474914)], null),cljs.core.update_in.call(null,opts,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"handler","handler",1706707644)], null),lt.object.__GT_id)));var info__$2 = cljs.core.assoc.call(null,info__$1,new cljs.core.Keyword(null,"print-length","print-length",3960797560),lt.object.raise_reduce.call(null,editor,new cljs.core.Keyword(null,"clojure.print-length+","clojure.print-length+",4366367949),null));return lt.object.raise.call(null,lt.plugins.clojure.clj_lang,new cljs.core.Keyword(null,"eval!","eval!",1110791799),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"origin","origin",4300251800),editor,new cljs.core.Keyword(null,"info","info",1017141280),info__$2], null));
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure","on-eval.custom","lt.plugins.clojure/on-eval.custom",2808954147),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.__BEH__on_eval__DOT__custom,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"eval.custom","eval.custom",3328560245),null], null), null));
lt.plugins.clojure.__BEH__on_code = (function __BEH__on_code(this$,result){return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"exec.cljs!","exec.cljs!",3800101572),result);
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure","on-code","lt.plugins.clojure/on-code",1190320137),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.__BEH__on_code,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"editor.eval.cljs.code","editor.eval.cljs.code",866569770),null], null), null));
lt.plugins.clojure.__BEH__exec__DOT__cljs_BANG_ = (function __BEH__exec__DOT__cljs_BANG_(this$,res){var client = new cljs.core.Keyword(null,"exec","exec",1017031683).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"client","client",3951159101).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)));var path = new cljs.core.Keyword(null,"path","path",1017337751).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"info","info",1017141280).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)));var res__$1 = cljs.core.update_in.call(null,res,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"results","results",2111450984)], null),((function (client,path){
return (function (p1__6725_SHARP_){var iter__5601__auto__ = ((function (client,path){
return (function iter__6730(s__6731){return (new cljs.core.LazySeq(null,((function (client,path){
return (function (){var s__6731__$1 = s__6731;while(true){
var temp__4092__auto__ = cljs.core.seq.call(null,s__6731__$1);if(temp__4092__auto__)
{var s__6731__$2 = temp__4092__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,s__6731__$2))
{var c__5599__auto__ = cljs.core.chunk_first.call(null,s__6731__$2);var size__5600__auto__ = cljs.core.count.call(null,c__5599__auto__);var b__6733 = cljs.core.chunk_buffer.call(null,size__5600__auto__);if((function (){var i__6732 = 0;while(true){
if((i__6732 < size__5600__auto__))
{var r = cljs.core._nth.call(null,c__5599__auto__,i__6732);cljs.core.chunk_append.call(null,b__6733,cljs.core.assoc.call(null,r,new cljs.core.Keyword(null,"code","code",1016963423),lt.objs.eval.append_source_file.call(null,lt.objs.eval.pad.call(null,new cljs.core.Keyword(null,"code","code",1016963423).cljs$core$IFn$_invoke$arity$1(r),(new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(r)) - 1)),path),new cljs.core.Keyword(null,"meta","meta",1017252215),cljs.core.merge.call(null,new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(res),new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(r))));
{
var G__6822 = (i__6732 + 1);
i__6732 = G__6822;
continue;
}
} else
{return true;
}
break;
}
})())
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__6733),iter__6730.call(null,cljs.core.chunk_rest.call(null,s__6731__$2)));
} else
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__6733),null);
}
} else
{var r = cljs.core.first.call(null,s__6731__$2);return cljs.core.cons.call(null,cljs.core.assoc.call(null,r,new cljs.core.Keyword(null,"code","code",1016963423),lt.objs.eval.append_source_file.call(null,lt.objs.eval.pad.call(null,new cljs.core.Keyword(null,"code","code",1016963423).cljs$core$IFn$_invoke$arity$1(r),(new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(r)) - 1)),path),new cljs.core.Keyword(null,"meta","meta",1017252215),cljs.core.merge.call(null,new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(res),new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(r))),iter__6730.call(null,cljs.core.rest.call(null,s__6731__$2)));
}
} else
{return null;
}
break;
}
});})(client,path))
,null,null));
});})(client,path))
;return iter__5601__auto__.call(null,p1__6725_SHARP_);
});})(client,path))
);return lt.objs.clients.send.call(null,lt.objs.eval.get_client_BANG_.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"editor.eval.cljs.exec","editor.eval.cljs.exec",866638030),new cljs.core.Keyword(null,"info","info",1017141280),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"type","type",1017479852),"cljs"], null),new cljs.core.Keyword(null,"key","key",1014010321),new cljs.core.Keyword(null,"exec","exec",1017031683),new cljs.core.Keyword(null,"origin","origin",4300251800),this$], null)),new cljs.core.Keyword(null,"editor.eval.cljs.exec","editor.eval.cljs.exec",866638030),res__$1,new cljs.core.Keyword(null,"only","only",1017320222),this$);
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure","exec.cljs!","lt.plugins.clojure/exec.cljs!",1322475104),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.__BEH__exec__DOT__cljs_BANG_,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"exec.cljs!","exec.cljs!",3800101572),null], null), null));
lt.plugins.clojure.mime__GT_type = new cljs.core.PersistentArrayMap(null, 2, ["text/x-clojure","clj","text/x-clojurescript","cljs"], null);
/**
* Default cljs client to invoke when a cljs file is first evaled. Takes any valid client or
* :auto which automatically sets 'Light Table UI' or 'ClojureScript Browser' based on whether
* project is LightTable related or not.
*/
lt.plugins.clojure.default_cljs_client = null;
lt.plugins.clojure.__BEH__set_default_cljs_client = (function __BEH__set_default_cljs_client(this$,client_name){return lt.plugins.clojure.default_cljs_client = client_name;
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure","set-default-cljs-client","lt.plugins.clojure/set-default-cljs-client",828416541),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.__BEH__set_default_cljs_client,new cljs.core.Keyword(null,"desc","desc",1016984067),"Clojure: Set default ClojureScript client to use when first evaled. Disable with nil",new cljs.core.Keyword(null,"params","params",4313443576),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"label","label",1116631654),"client-name",new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"list","list",1017226256),new cljs.core.Keyword(null,"items","items",1114430258),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, ["ClojureScript Browser","Light Table UI","Browser","Browser (External)"], null)], null)], null),new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"object.instant","object.instant",773332388),null], null), null),new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"user","user",1017503549));
/**
* Determine if path is part of a project that evals to LightTable's process
* e.g. LightTable plugin or LightTable itself
*/
lt.plugins.clojure.lighttable_ui_project_QMARK_ = (function lighttable_ui_project_QMARK_(path){var or__4884__auto__ = lt.objs.files.walk_up_find.call(null,path,"plugin.edn");if(cljs.core.truth_(or__4884__auto__))
{return or__4884__auto__;
} else
{var or__4884__auto____$1 = lt.objs.files.walk_up_find.call(null,path,"plugin.json");if(cljs.core.truth_(or__4884__auto____$1))
{return or__4884__auto____$1;
} else
{var temp__4092__auto__ = lt.objs.files.walk_up_find.call(null,path,"project.clj");if(cljs.core.truth_(temp__4092__auto__))
{var project_file = temp__4092__auto__;return cljs.core._EQ_.call(null,new cljs.core.Symbol(null,"lighttable","lighttable",-1830273487,null),cljs.core.second.call(null,cljs.reader.read_string.call(null,new cljs.core.Keyword(null,"content","content",1965434859).cljs$core$IFn$_invoke$arity$1(lt.objs.files.open_sync.call(null,project_file)))));
} else
{return null;
}
}
}
});
lt.plugins.clojure.__BEH__eval_BANG_ = (function __BEH__eval_BANG_(this$,event){var map__6735 = event;var map__6735__$1 = ((cljs.core.seq_QMARK_.call(null,map__6735))?cljs.core.apply.call(null,cljs.core.hash_map,map__6735):map__6735);var origin = cljs.core.get.call(null,map__6735__$1,new cljs.core.Keyword(null,"origin","origin",4300251800));var info = cljs.core.get.call(null,map__6735__$1,new cljs.core.Keyword(null,"info","info",1017141280));var command = lt.util.cljs.__GT_dottedkw.call(null,new cljs.core.Keyword(null,"editor.eval","editor.eval",4270299119),lt.plugins.clojure.mime__GT_type.call(null,new cljs.core.Keyword(null,"mime","mime",1017255846).cljs$core$IFn$_invoke$arity$1(info)));var client = new cljs.core.Keyword(null,"default","default",2558708147).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"client","client",3951159101).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,origin)));lt.objs.notifos.working.call(null);
return lt.objs.clients.send.call(null,lt.objs.eval.get_client_BANG_.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",1964298941),command,new cljs.core.Keyword(null,"info","info",1017141280),info,new cljs.core.Keyword(null,"origin","origin",4300251800),origin,new cljs.core.Keyword(null,"create","create",3956577390),((function (map__6735,map__6735__$1,origin,info,command,client){
return (function (arg){if(cljs.core.contains_QMARK_.call(null,cljs.core.set.call(null,new cljs.core.Keyword(null,"tags","tags",1017456523).cljs$core$IFn$_invoke$arity$1(info)),new cljs.core.Keyword(null,"editor.cljs","editor.cljs",4270230213)))
{var client_6823__$1 = ((cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"auto","auto",1016910113),lt.plugins.clojure.default_cljs_client))?(cljs.core.truth_(lt.plugins.clojure.lighttable_ui_project_QMARK_.call(null,new cljs.core.Keyword(null,"path","path",1017337751).cljs$core$IFn$_invoke$arity$1(info)))?"Light Table UI":"ClojureScript Browser"):lt.plugins.clojure.default_cljs_client);var temp__4092__auto___6824 = new cljs.core.Keyword(null,"connect","connect",1965255772).cljs$core$IFn$_invoke$arity$1(cljs.core.get.call(null,new cljs.core.Keyword(null,"connectors","connectors",4533225784).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.objs.sidebar.clients.clients)),client_6823__$1));if(cljs.core.truth_(temp__4092__auto___6824))
{var connect_fn_6825 = temp__4092__auto___6824;connect_fn_6825.call(null);
} else
{}
} else
{}
return lt.plugins.clojure.try_connect.call(null,arg);
});})(map__6735,map__6735__$1,origin,info,command,client))
], null)),command,info,new cljs.core.Keyword(null,"only","only",1017320222),origin);
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure","eval!","lt.plugins.clojure/eval!",1863154227),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.__BEH__eval_BANG_,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"eval!","eval!",1110791799),null], null), null));
lt.plugins.clojure.__BEH__build_BANG_ = (function __BEH__build_BANG_(this$,event){var map__6737 = event;var map__6737__$1 = ((cljs.core.seq_QMARK_.call(null,map__6737))?cljs.core.apply.call(null,cljs.core.hash_map,map__6737):map__6737);var origin = cljs.core.get.call(null,map__6737__$1,new cljs.core.Keyword(null,"origin","origin",4300251800));var info = cljs.core.get.call(null,map__6737__$1,new cljs.core.Keyword(null,"info","info",1017141280));var command = lt.util.cljs.__GT_dottedkw.call(null,lt.plugins.clojure.mime__GT_type.call(null,new cljs.core.Keyword(null,"mime","mime",1017255846).cljs$core$IFn$_invoke$arity$1(info)),"compile");lt.objs.notifos.working.call(null,"Starting build");
return lt.objs.clients.send.call(null,lt.objs.eval.get_client_BANG_.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",1964298941),command,new cljs.core.Keyword(null,"info","info",1017141280),info,new cljs.core.Keyword(null,"origin","origin",4300251800),origin,new cljs.core.Keyword(null,"create","create",3956577390),lt.plugins.clojure.try_connect], null)),command,info,new cljs.core.Keyword(null,"only","only",1017320222),origin);
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure","build!","lt.plugins.clojure/build!",1190684225),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.__BEH__build_BANG_,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"build!","build!",3930847973),null], null), null));
lt.plugins.clojure.__BEH__build_cljs_plugin = (function __BEH__build_cljs_plugin(this$,opts){var to_compile = lt.objs.files.filter_walk.call(null,(function (p1__6738_SHARP_){return cljs.core._EQ_.call(null,lt.objs.files.ext.call(null,p1__6738_SHARP_),"cljs");
}),lt.objs.files.join.call(null,new cljs.core.Keyword("lt.objs.plugins","plugin-path","lt.objs.plugins/plugin-path",2063828362).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)),"src"));return lt.object.raise.call(null,lt.plugins.clojure.clj_lang,new cljs.core.Keyword(null,"build!","build!",3930847973),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"info","info",1017141280),new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"files","files",1111338473),to_compile,new cljs.core.Keyword(null,"mime","mime",1017255846),new cljs.core.Keyword(null,"mime","mime",1017255846).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"info","info",1017141280).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$))),new cljs.core.Keyword(null,"dir","dir",1014003711),new cljs.core.Keyword("lt.objs.plugins","plugin-path","lt.objs.plugins/plugin-path",2063828362).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)),new cljs.core.Keyword(null,"path","path",1017337751),lt.objs.files.join.call(null,new cljs.core.Keyword("lt.objs.plugins","plugin-path","lt.objs.plugins/plugin-path",2063828362).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)),"plugin.edn"),new cljs.core.Keyword(null,"ignore","ignore",4118475076),new cljs.core.PersistentVector(null, 16, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"goog","goog",-1637352839,null),new cljs.core.Symbol(null,"goog.array","goog.array",-658519708,null),new cljs.core.Symbol(null,"lt.object","lt.object",-2122453986,null),new cljs.core.Symbol(null,"crate.core","crate.core",550297763,null),new cljs.core.Symbol(null,"crate.util","crate.util",550838534,null),new cljs.core.Symbol(null,"lt.util.load","lt.util.load",2092978213,null),new cljs.core.Symbol(null,"lt.util.cljs","lt.util.cljs",2092707505,null),new cljs.core.Symbol(null,"lt.util.dom","lt.util.dom",-273177419,null),new cljs.core.Symbol(null,"lt.util.js","lt.util.js",2144354824,null),new cljs.core.Symbol(null,"fetch.core","fetch.core",-1380286452,null),new cljs.core.Symbol(null,"fetch.util","fetch.util",-1379745681,null),new cljs.core.Symbol(null,"cljs.core","cljs.core",1979061844,null),new cljs.core.Symbol(null,"cljs.reader","cljs.reader",-1715113864,null),new cljs.core.Symbol(null,"clojure.string","clojure.string",-2028944364,null),new cljs.core.Symbol(null,"clojure.set","clojure.set",-2081128431,null),new cljs.core.Symbol(null,"goog.string","goog.string",-745757000,null)], null),new cljs.core.Keyword(null,"merge?","merge?",4231255673),true], null),new cljs.core.Keyword(null,"origin","origin",4300251800),this$], null));
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure","build-cljs-plugin","lt.plugins.clojure/build-cljs-plugin",4539349021),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.__BEH__build_cljs_plugin,new cljs.core.Keyword(null,"desc","desc",1016984067),"Plugin: build ClojureScript plugin",new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"build","build",1107999200),null], null), null));
lt.plugins.clojure.__BEH__plugin_compile_results = (function __BEH__plugin_compile_results(this$,res){var plugin_name = clojure.string.lower_case.call(null,new cljs.core.Keyword(null,"name","name",1017277949).cljs$core$IFn$_invoke$arity$1(lt.objs.plugins.plugin_info.call(null,new cljs.core.Keyword("lt.objs.plugins","plugin-path","lt.objs.plugins/plugin-path",2063828362).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)))));var final_path = lt.objs.files.join.call(null,new cljs.core.Keyword("lt.objs.plugins","plugin-path","lt.objs.plugins/plugin-path",2063828362).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)),[cljs.core.str(plugin_name),cljs.core.str("_compiled.js")].join(''));var plugin_map_name = [cljs.core.str(plugin_name),cljs.core.str("_compiled.js.map")].join('');var sm_path = lt.objs.files.join.call(null,new cljs.core.Keyword("lt.objs.plugins","plugin-path","lt.objs.plugins/plugin-path",2063828362).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)),plugin_map_name);lt.objs.notifos.done_working.call(null,[cljs.core.str("Compiled plugin to "),cljs.core.str(final_path)].join(''));
lt.objs.files.save.call(null,final_path,[cljs.core.str(new cljs.core.Keyword(null,"js","js",1013907643).cljs$core$IFn$_invoke$arity$1(res)),cljs.core.str("\n//# sourceMappingURL="),cljs.core.str(plugin_map_name)].join(''));
return lt.objs.files.save.call(null,sm_path,new cljs.core.Keyword(null,"source-map","source-map",4196266012).cljs$core$IFn$_invoke$arity$1(res));
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure","plugin-compile-results","lt.plugins.clojure/plugin-compile-results",4522483440),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.__BEH__plugin_compile_results,new cljs.core.Keyword(null,"desc","desc",1016984067),"Plugin: output compile results",new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"cljs.compile.results","cljs.compile.results",3808629809),null], null), null));
lt.plugins.clojure.__BEH__on_result_set_ns = (function __BEH__on_result_set_ns(obj,res){if(cljs.core.truth_((function (){var and__4872__auto__ = new cljs.core.Keyword(null,"ns","ns",1013907767).cljs$core$IFn$_invoke$arity$1(res);if(cljs.core.truth_(and__4872__auto__))
{return cljs.core.not_EQ_.call(null,new cljs.core.Keyword(null,"ns","ns",1013907767).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"info","info",1017141280).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,obj))),new cljs.core.Keyword(null,"ns","ns",1013907767).cljs$core$IFn$_invoke$arity$1(res));
} else
{return and__4872__auto__;
}
})()))
{return lt.object.update_BANG_.call(null,obj,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"info","info",1017141280)], null),cljs.core.assoc,new cljs.core.Keyword(null,"ns","ns",1013907767),new cljs.core.Keyword(null,"ns","ns",1013907767).cljs$core$IFn$_invoke$arity$1(res));
} else
{return null;
}
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure","on-result-set-ns","lt.plugins.clojure/on-result-set-ns",3812909664),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.__BEH__on_result_set_ns,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"editor.eval.cljs.code","editor.eval.cljs.code",866569770),null,new cljs.core.Keyword(null,"editor.eval.clj.result","editor.eval.clj.result",1582056205),null], null), null));
lt.plugins.clojure.__BEH__no_op = (function __BEH__no_op(this$){return lt.objs.notifos.done_working.call(null);
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure","no-op","lt.plugins.clojure/no-op",1860347963),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.__BEH__no_op,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"editor.eval.clj.no-op","editor.eval.clj.no-op",3245525409),null,new cljs.core.Keyword(null,"editor.eval.cljs.no-op","editor.eval.cljs.no-op",751609204),null], null), null));
lt.plugins.clojure.__BEH__cljs_result = (function __BEH__cljs_result(obj,res){lt.objs.notifos.done_working.call(null);
var type = (function (){var or__4884__auto__ = new cljs.core.Keyword(null,"result-type","result-type",4725630556).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(res));if(cljs.core.truth_(or__4884__auto__))
{return or__4884__auto__;
} else
{return new cljs.core.Keyword(null,"inline","inline",4124874251);
}
})();var ev = lt.util.cljs.__GT_dottedkw.call(null,new cljs.core.Keyword(null,"editor.eval.cljs.result","editor.eval.cljs.result",1580065178),type);return lt.object.raise.call(null,obj,ev,res);
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure","cljs-result","lt.plugins.clojure/cljs-result",779436518),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.__BEH__cljs_result,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"editor.eval.cljs.result","editor.eval.cljs.result",1580065178),null], null), null));
lt.plugins.clojure.__BEH__cljs_result__DOT__replace = (function __BEH__cljs_result__DOT__replace(obj,res){var temp__4090__auto__ = (function (){var or__4884__auto__ = new cljs.core.Keyword(null,"stack","stack",1123661306).cljs$core$IFn$_invoke$arity$1(res);if(cljs.core.truth_(or__4884__auto__))
{return or__4884__auto__;
} else
{return new cljs.core.Keyword(null,"ex","ex",1013907493).cljs$core$IFn$_invoke$arity$1(res);
}
})();if(cljs.core.truth_(temp__4090__auto__))
{var err = temp__4090__auto__;return lt.objs.notifos.set_msg_BANG_.call(null,err,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",1108647146),"error"], null));
} else
{return lt.objs.editor.replace_selection.call(null,obj,lt.plugins.clojure.unescape_unicode.call(null,(function (){var or__4884__auto__ = new cljs.core.Keyword(null,"result","result",4374444943).cljs$core$IFn$_invoke$arity$1(res);if(cljs.core.truth_(or__4884__auto__))
{return or__4884__auto__;
} else
{return "";
}
})()));
}
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure","cljs-result.replace","lt.plugins.clojure/cljs-result.replace",2659047564),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.__BEH__cljs_result__DOT__replace,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"editor.eval.cljs.result.replace","editor.eval.cljs.result.replace",1975778400),null], null), null));
lt.plugins.clojure.__BEH__cljs_result__DOT__statusbar = (function __BEH__cljs_result__DOT__statusbar(obj,res){var temp__4090__auto__ = (function (){var or__4884__auto__ = new cljs.core.Keyword(null,"stack","stack",1123661306).cljs$core$IFn$_invoke$arity$1(res);if(cljs.core.truth_(or__4884__auto__))
{return or__4884__auto__;
} else
{return new cljs.core.Keyword(null,"ex","ex",1013907493).cljs$core$IFn$_invoke$arity$1(res);
}
})();if(cljs.core.truth_(temp__4090__auto__))
{var err = temp__4090__auto__;return lt.objs.notifos.set_msg_BANG_.call(null,err,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",1108647146),"error"], null));
} else
{return lt.objs.notifos.set_msg_BANG_.call(null,lt.plugins.clojure.unescape_unicode.call(null,(function (){var or__4884__auto__ = new cljs.core.Keyword(null,"result","result",4374444943).cljs$core$IFn$_invoke$arity$1(res);if(cljs.core.truth_(or__4884__auto__))
{return or__4884__auto__;
} else
{return "";
}
})()),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",1108647146),"result"], null));
}
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure","cljs-result.statusbar","lt.plugins.clojure/cljs-result.statusbar",1141718617),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.__BEH__cljs_result__DOT__statusbar,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"editor.eval.cljs.result.statusbar","editor.eval.cljs.result.statusbar",4637192717),null], null), null));
lt.plugins.clojure.__BEH__cljs_result__DOT__inline = (function __BEH__cljs_result__DOT__inline(obj,res){var meta = new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(res);var loc = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",1017226086),(new cljs.core.Keyword(null,"end-line","end-line",2693041432).cljs$core$IFn$_invoke$arity$1(meta) - 1),new cljs.core.Keyword(null,"ch","ch",1013907415),new cljs.core.Keyword(null,"end-column","end-column",3799845882).cljs$core$IFn$_invoke$arity$1(meta),new cljs.core.Keyword(null,"start-line","start-line",3689311729),(new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(meta) - 1)], null);var temp__4090__auto__ = (function (){var or__4884__auto__ = new cljs.core.Keyword(null,"stack","stack",1123661306).cljs$core$IFn$_invoke$arity$1(res);if(cljs.core.truth_(or__4884__auto__))
{return or__4884__auto__;
} else
{return new cljs.core.Keyword(null,"ex","ex",1013907493).cljs$core$IFn$_invoke$arity$1(res);
}
})();if(cljs.core.truth_(temp__4090__auto__))
{var err = temp__4090__auto__;return lt.object.raise.call(null,obj,new cljs.core.Keyword(null,"editor.eval.cljs.exception","editor.eval.cljs.exception",4479049174),res,new cljs.core.Keyword(null,"passed","passed",4313490402));
} else
{return lt.object.raise.call(null,obj,new cljs.core.Keyword(null,"editor.result","editor.result",4030217008),lt.plugins.clojure.unescape_unicode.call(null,(function (){var or__4884__auto__ = new cljs.core.Keyword(null,"result","result",4374444943).cljs$core$IFn$_invoke$arity$1(res);if(cljs.core.truth_(or__4884__auto__))
{return or__4884__auto__;
} else
{return "";
}
})()),loc);
}
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure","cljs-result.inline","lt.plugins.clojure/cljs-result.inline",3718133053),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.__BEH__cljs_result__DOT__inline,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"editor.eval.cljs.result.inline","editor.eval.cljs.result.inline",4674785425),null], null), null));
lt.plugins.clojure.__BEH__cljs_result__DOT__inline_at_cursor = (function __BEH__cljs_result__DOT__inline_at_cursor(obj,res){var meta = new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(res);var loc = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"line","line",1017226086),new cljs.core.Keyword(null,"start","start",1123661780).cljs$core$IFn$_invoke$arity$1(meta),new cljs.core.Keyword(null,"start-line","start-line",3689311729),new cljs.core.Keyword(null,"start","start",1123661780).cljs$core$IFn$_invoke$arity$1(meta)], null);var temp__4090__auto__ = (function (){var or__4884__auto__ = new cljs.core.Keyword(null,"stack","stack",1123661306).cljs$core$IFn$_invoke$arity$1(res);if(cljs.core.truth_(or__4884__auto__))
{return or__4884__auto__;
} else
{return new cljs.core.Keyword(null,"ex","ex",1013907493).cljs$core$IFn$_invoke$arity$1(res);
}
})();if(cljs.core.truth_(temp__4090__auto__))
{var err = temp__4090__auto__;return lt.object.raise.call(null,obj,new cljs.core.Keyword(null,"editor.eval.cljs.exception","editor.eval.cljs.exception",4479049174),res,new cljs.core.Keyword(null,"passed","passed",4313490402));
} else
{return lt.object.raise.call(null,obj,new cljs.core.Keyword(null,"editor.result","editor.result",4030217008),lt.plugins.clojure.unescape_unicode.call(null,(function (){var or__4884__auto__ = new cljs.core.Keyword(null,"result","result",4374444943).cljs$core$IFn$_invoke$arity$1(res);if(cljs.core.truth_(or__4884__auto__))
{return or__4884__auto__;
} else
{return "";
}
})()),loc);
}
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure","cljs-result.inline-at-cursor","lt.plugins.clojure/cljs-result.inline-at-cursor",3375816544),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.__BEH__cljs_result__DOT__inline_at_cursor,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"editor.eval.cljs.result.inline-at-cursor","editor.eval.cljs.result.inline-at-cursor",1541585524),null], null), null));
lt.plugins.clojure.__BEH__cljs_result__DOT__return = (function __BEH__cljs_result__DOT__return(obj,res){var meta = new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(res);var handler = lt.object.by_id.call(null,new cljs.core.Keyword(null,"handler","handler",1706707644).cljs$core$IFn$_invoke$arity$1(meta));var ev = new cljs.core.Keyword(null,"trigger","trigger",4248979754).cljs$core$IFn$_invoke$arity$1(meta);var temp__4090__auto__ = (function (){var or__4884__auto__ = new cljs.core.Keyword(null,"stack","stack",1123661306).cljs$core$IFn$_invoke$arity$1(res);if(cljs.core.truth_(or__4884__auto__))
{return or__4884__auto__;
} else
{return new cljs.core.Keyword(null,"ex","ex",1013907493).cljs$core$IFn$_invoke$arity$1(res);
}
})();if(cljs.core.truth_(temp__4090__auto__))
{var err = temp__4090__auto__;return lt.object.raise.call(null,obj,new cljs.core.Keyword(null,"editor.eval.cljs.exception","editor.eval.cljs.exception",4479049174),res,new cljs.core.Keyword(null,"passed","passed",4313490402));
} else
{return lt.object.raise.call(null,handler,ev,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"result","result",4374444943),lt.plugins.clojure.unescape_unicode.call(null,(function (){var or__4884__auto__ = new cljs.core.Keyword(null,"result","result",4374444943).cljs$core$IFn$_invoke$arity$1(res);if(cljs.core.truth_(or__4884__auto__))
{return or__4884__auto__;
} else
{return "";
}
})()),new cljs.core.Keyword(null,"meta","meta",1017252215),meta], null));
}
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure","cljs-result.return","lt.plugins.clojure/cljs-result.return",3430717492),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.__BEH__cljs_result__DOT__return,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"editor.eval.cljs.result.return","editor.eval.cljs.result.return",629418792),null], null), null));
lt.plugins.clojure.__BEH__clj_result = (function __BEH__clj_result(obj,res){lt.objs.notifos.done_working.call(null);
var type = (function (){var or__4884__auto__ = new cljs.core.Keyword(null,"result-type","result-type",4725630556).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(res));if(cljs.core.truth_(or__4884__auto__))
{return or__4884__auto__;
} else
{return new cljs.core.Keyword(null,"inline","inline",4124874251);
}
})();var ev = lt.util.cljs.__GT_dottedkw.call(null,new cljs.core.Keyword(null,"editor.eval.clj.result","editor.eval.clj.result",1582056205),type);return lt.object.raise.call(null,obj,ev,res);
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure","clj-result","lt.plugins.clojure/clj-result",1703646583),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.__BEH__clj_result,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"editor.eval.clj.result","editor.eval.clj.result",1582056205),null], null), null));
lt.plugins.clojure.__BEH__clj_result__DOT__replace = (function __BEH__clj_result__DOT__replace(obj,res){var seq__6745 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"results","results",2111450984).cljs$core$IFn$_invoke$arity$1(res));var chunk__6747 = null;var count__6748 = 0;var i__6749 = 0;while(true){
if((i__6749 < count__6748))
{var result = cljs.core._nth.call(null,chunk__6747,i__6749);var meta_6826 = new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(result);var loc_6827 = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",1017226086),(new cljs.core.Keyword(null,"end-line","end-line",2693041432).cljs$core$IFn$_invoke$arity$1(meta_6826) - 1),new cljs.core.Keyword(null,"ch","ch",1013907415),new cljs.core.Keyword(null,"end-column","end-column",3799845882).cljs$core$IFn$_invoke$arity$1(meta_6826),new cljs.core.Keyword(null,"start-line","start-line",3689311729),(new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(meta_6826) - 1)], null);if(cljs.core.truth_(new cljs.core.Keyword(null,"stack","stack",1123661306).cljs$core$IFn$_invoke$arity$1(result)))
{lt.objs.notifos.set_msg_BANG_.call(null,new cljs.core.Keyword(null,"result","result",4374444943).cljs$core$IFn$_invoke$arity$1(res),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",1108647146),"error"], null));
} else
{lt.objs.editor.replace_selection.call(null,obj,new cljs.core.Keyword(null,"result","result",4374444943).cljs$core$IFn$_invoke$arity$1(result));
}
{
var G__6828 = seq__6745;
var G__6829 = chunk__6747;
var G__6830 = count__6748;
var G__6831 = (i__6749 + 1);
seq__6745 = G__6828;
chunk__6747 = G__6829;
count__6748 = G__6830;
i__6749 = G__6831;
continue;
}
} else
{var temp__4092__auto__ = cljs.core.seq.call(null,seq__6745);if(temp__4092__auto__)
{var seq__6745__$1 = temp__4092__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,seq__6745__$1))
{var c__5632__auto__ = cljs.core.chunk_first.call(null,seq__6745__$1);{
var G__6832 = cljs.core.chunk_rest.call(null,seq__6745__$1);
var G__6833 = c__5632__auto__;
var G__6834 = cljs.core.count.call(null,c__5632__auto__);
var G__6835 = 0;
seq__6745 = G__6832;
chunk__6747 = G__6833;
count__6748 = G__6834;
i__6749 = G__6835;
continue;
}
} else
{var result = cljs.core.first.call(null,seq__6745__$1);var meta_6836 = new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(result);var loc_6837 = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",1017226086),(new cljs.core.Keyword(null,"end-line","end-line",2693041432).cljs$core$IFn$_invoke$arity$1(meta_6836) - 1),new cljs.core.Keyword(null,"ch","ch",1013907415),new cljs.core.Keyword(null,"end-column","end-column",3799845882).cljs$core$IFn$_invoke$arity$1(meta_6836),new cljs.core.Keyword(null,"start-line","start-line",3689311729),(new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(meta_6836) - 1)], null);if(cljs.core.truth_(new cljs.core.Keyword(null,"stack","stack",1123661306).cljs$core$IFn$_invoke$arity$1(result)))
{lt.objs.notifos.set_msg_BANG_.call(null,new cljs.core.Keyword(null,"result","result",4374444943).cljs$core$IFn$_invoke$arity$1(res),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",1108647146),"error"], null));
} else
{lt.objs.editor.replace_selection.call(null,obj,new cljs.core.Keyword(null,"result","result",4374444943).cljs$core$IFn$_invoke$arity$1(result));
}
{
var G__6838 = cljs.core.next.call(null,seq__6745__$1);
var G__6839 = null;
var G__6840 = 0;
var G__6841 = 0;
seq__6745 = G__6838;
chunk__6747 = G__6839;
count__6748 = G__6840;
i__6749 = G__6841;
continue;
}
}
} else
{return null;
}
}
break;
}
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure","clj-result.replace","lt.plugins.clojure/clj-result.replace",3751811869),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.__BEH__clj_result__DOT__replace,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"editor.eval.clj.result.replace","editor.eval.clj.result.replace",4306451155),null], null), null));
lt.plugins.clojure.__BEH__clj_result__DOT__statusbar = (function __BEH__clj_result__DOT__statusbar(obj,res){var seq__6757 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"results","results",2111450984).cljs$core$IFn$_invoke$arity$1(res));var chunk__6759 = null;var count__6760 = 0;var i__6761 = 0;while(true){
if((i__6761 < count__6760))
{var result = cljs.core._nth.call(null,chunk__6759,i__6761);var meta_6842 = new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(result);var loc_6843 = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",1017226086),(new cljs.core.Keyword(null,"end-line","end-line",2693041432).cljs$core$IFn$_invoke$arity$1(meta_6842) - 1),new cljs.core.Keyword(null,"ch","ch",1013907415),new cljs.core.Keyword(null,"end-column","end-column",3799845882).cljs$core$IFn$_invoke$arity$1(meta_6842),new cljs.core.Keyword(null,"start-line","start-line",3689311729),(new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(meta_6842) - 1)], null);if(cljs.core.truth_(new cljs.core.Keyword(null,"stack","stack",1123661306).cljs$core$IFn$_invoke$arity$1(result)))
{lt.objs.notifos.set_msg_BANG_.call(null,new cljs.core.Keyword(null,"result","result",4374444943).cljs$core$IFn$_invoke$arity$1(res),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",1108647146),"error"], null));
} else
{lt.objs.notifos.set_msg_BANG_.call(null,new cljs.core.Keyword(null,"result","result",4374444943).cljs$core$IFn$_invoke$arity$1(result),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",1108647146),"result"], null));
}
{
var G__6844 = seq__6757;
var G__6845 = chunk__6759;
var G__6846 = count__6760;
var G__6847 = (i__6761 + 1);
seq__6757 = G__6844;
chunk__6759 = G__6845;
count__6760 = G__6846;
i__6761 = G__6847;
continue;
}
} else
{var temp__4092__auto__ = cljs.core.seq.call(null,seq__6757);if(temp__4092__auto__)
{var seq__6757__$1 = temp__4092__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,seq__6757__$1))
{var c__5632__auto__ = cljs.core.chunk_first.call(null,seq__6757__$1);{
var G__6848 = cljs.core.chunk_rest.call(null,seq__6757__$1);
var G__6849 = c__5632__auto__;
var G__6850 = cljs.core.count.call(null,c__5632__auto__);
var G__6851 = 0;
seq__6757 = G__6848;
chunk__6759 = G__6849;
count__6760 = G__6850;
i__6761 = G__6851;
continue;
}
} else
{var result = cljs.core.first.call(null,seq__6757__$1);var meta_6852 = new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(result);var loc_6853 = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",1017226086),(new cljs.core.Keyword(null,"end-line","end-line",2693041432).cljs$core$IFn$_invoke$arity$1(meta_6852) - 1),new cljs.core.Keyword(null,"ch","ch",1013907415),new cljs.core.Keyword(null,"end-column","end-column",3799845882).cljs$core$IFn$_invoke$arity$1(meta_6852),new cljs.core.Keyword(null,"start-line","start-line",3689311729),(new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(meta_6852) - 1)], null);if(cljs.core.truth_(new cljs.core.Keyword(null,"stack","stack",1123661306).cljs$core$IFn$_invoke$arity$1(result)))
{lt.objs.notifos.set_msg_BANG_.call(null,new cljs.core.Keyword(null,"result","result",4374444943).cljs$core$IFn$_invoke$arity$1(res),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",1108647146),"error"], null));
} else
{lt.objs.notifos.set_msg_BANG_.call(null,new cljs.core.Keyword(null,"result","result",4374444943).cljs$core$IFn$_invoke$arity$1(result),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",1108647146),"result"], null));
}
{
var G__6854 = cljs.core.next.call(null,seq__6757__$1);
var G__6855 = null;
var G__6856 = 0;
var G__6857 = 0;
seq__6757 = G__6854;
chunk__6759 = G__6855;
count__6760 = G__6856;
i__6761 = G__6857;
continue;
}
}
} else
{return null;
}
}
break;
}
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure","clj-result.statusbar","lt.plugins.clojure/clj-result.statusbar",4592761002),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.__BEH__clj_result__DOT__statusbar,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"editor.eval.clj.result.statusbar","editor.eval.clj.result.statusbar",2440781760),null], null), null));
lt.plugins.clojure.__BEH__clj_result__DOT__inline = (function __BEH__clj_result__DOT__inline(obj,res){var seq__6769 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"results","results",2111450984).cljs$core$IFn$_invoke$arity$1(res));var chunk__6771 = null;var count__6772 = 0;var i__6773 = 0;while(true){
if((i__6773 < count__6772))
{var result = cljs.core._nth.call(null,chunk__6771,i__6773);var meta_6858 = new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(result);var loc_6859 = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",1017226086),(new cljs.core.Keyword(null,"end-line","end-line",2693041432).cljs$core$IFn$_invoke$arity$1(meta_6858) - 1),new cljs.core.Keyword(null,"ch","ch",1013907415),new cljs.core.Keyword(null,"end-column","end-column",3799845882).cljs$core$IFn$_invoke$arity$1(meta_6858),new cljs.core.Keyword(null,"start-line","start-line",3689311729),(new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(meta_6858) - 1)], null);if(cljs.core.truth_(new cljs.core.Keyword(null,"stack","stack",1123661306).cljs$core$IFn$_invoke$arity$1(result)))
{lt.object.raise.call(null,obj,new cljs.core.Keyword(null,"editor.eval.clj.exception","editor.eval.clj.exception",3664192387),result,new cljs.core.Keyword(null,"passed","passed",4313490402));
} else
{lt.object.raise.call(null,obj,new cljs.core.Keyword(null,"editor.result","editor.result",4030217008),new cljs.core.Keyword(null,"result","result",4374444943).cljs$core$IFn$_invoke$arity$1(result),loc_6859);
}
{
var G__6860 = seq__6769;
var G__6861 = chunk__6771;
var G__6862 = count__6772;
var G__6863 = (i__6773 + 1);
seq__6769 = G__6860;
chunk__6771 = G__6861;
count__6772 = G__6862;
i__6773 = G__6863;
continue;
}
} else
{var temp__4092__auto__ = cljs.core.seq.call(null,seq__6769);if(temp__4092__auto__)
{var seq__6769__$1 = temp__4092__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,seq__6769__$1))
{var c__5632__auto__ = cljs.core.chunk_first.call(null,seq__6769__$1);{
var G__6864 = cljs.core.chunk_rest.call(null,seq__6769__$1);
var G__6865 = c__5632__auto__;
var G__6866 = cljs.core.count.call(null,c__5632__auto__);
var G__6867 = 0;
seq__6769 = G__6864;
chunk__6771 = G__6865;
count__6772 = G__6866;
i__6773 = G__6867;
continue;
}
} else
{var result = cljs.core.first.call(null,seq__6769__$1);var meta_6868 = new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(result);var loc_6869 = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",1017226086),(new cljs.core.Keyword(null,"end-line","end-line",2693041432).cljs$core$IFn$_invoke$arity$1(meta_6868) - 1),new cljs.core.Keyword(null,"ch","ch",1013907415),new cljs.core.Keyword(null,"end-column","end-column",3799845882).cljs$core$IFn$_invoke$arity$1(meta_6868),new cljs.core.Keyword(null,"start-line","start-line",3689311729),(new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(meta_6868) - 1)], null);if(cljs.core.truth_(new cljs.core.Keyword(null,"stack","stack",1123661306).cljs$core$IFn$_invoke$arity$1(result)))
{lt.object.raise.call(null,obj,new cljs.core.Keyword(null,"editor.eval.clj.exception","editor.eval.clj.exception",3664192387),result,new cljs.core.Keyword(null,"passed","passed",4313490402));
} else
{lt.object.raise.call(null,obj,new cljs.core.Keyword(null,"editor.result","editor.result",4030217008),new cljs.core.Keyword(null,"result","result",4374444943).cljs$core$IFn$_invoke$arity$1(result),loc_6869);
}
{
var G__6870 = cljs.core.next.call(null,seq__6769__$1);
var G__6871 = null;
var G__6872 = 0;
var G__6873 = 0;
seq__6769 = G__6870;
chunk__6771 = G__6871;
count__6772 = G__6872;
i__6773 = G__6873;
continue;
}
}
} else
{return null;
}
}
break;
}
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure","clj-result.inline","lt.plugins.clojure/clj-result.inline",2644767948),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.__BEH__clj_result__DOT__inline,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"editor.eval.clj.result.inline","editor.eval.clj.result.inline",1424832446),null], null), null));
lt.plugins.clojure.__BEH__clj_result__DOT__inline_at_cursor = (function __BEH__clj_result__DOT__inline_at_cursor(obj,res){var seq__6781 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"results","results",2111450984).cljs$core$IFn$_invoke$arity$1(res));var chunk__6783 = null;var count__6784 = 0;var i__6785 = 0;while(true){
if((i__6785 < count__6784))
{var result = cljs.core._nth.call(null,chunk__6783,i__6785);var meta_6874 = new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(result);var loc_6875 = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"line","line",1017226086),new cljs.core.Keyword(null,"start","start",1123661780).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(res)),new cljs.core.Keyword(null,"start-line","start-line",3689311729),new cljs.core.Keyword(null,"start","start",1123661780).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(res))], null);if(cljs.core.truth_(new cljs.core.Keyword(null,"stack","stack",1123661306).cljs$core$IFn$_invoke$arity$1(result)))
{lt.object.raise.call(null,obj,new cljs.core.Keyword(null,"editor.eval.clj.exception","editor.eval.clj.exception",3664192387),result,new cljs.core.Keyword(null,"passed","passed",4313490402));
} else
{lt.object.raise.call(null,obj,new cljs.core.Keyword(null,"editor.result","editor.result",4030217008),new cljs.core.Keyword(null,"result","result",4374444943).cljs$core$IFn$_invoke$arity$1(result),loc_6875);
}
{
var G__6876 = seq__6781;
var G__6877 = chunk__6783;
var G__6878 = count__6784;
var G__6879 = (i__6785 + 1);
seq__6781 = G__6876;
chunk__6783 = G__6877;
count__6784 = G__6878;
i__6785 = G__6879;
continue;
}
} else
{var temp__4092__auto__ = cljs.core.seq.call(null,seq__6781);if(temp__4092__auto__)
{var seq__6781__$1 = temp__4092__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,seq__6781__$1))
{var c__5632__auto__ = cljs.core.chunk_first.call(null,seq__6781__$1);{
var G__6880 = cljs.core.chunk_rest.call(null,seq__6781__$1);
var G__6881 = c__5632__auto__;
var G__6882 = cljs.core.count.call(null,c__5632__auto__);
var G__6883 = 0;
seq__6781 = G__6880;
chunk__6783 = G__6881;
count__6784 = G__6882;
i__6785 = G__6883;
continue;
}
} else
{var result = cljs.core.first.call(null,seq__6781__$1);var meta_6884 = new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(result);var loc_6885 = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"line","line",1017226086),new cljs.core.Keyword(null,"start","start",1123661780).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(res)),new cljs.core.Keyword(null,"start-line","start-line",3689311729),new cljs.core.Keyword(null,"start","start",1123661780).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(res))], null);if(cljs.core.truth_(new cljs.core.Keyword(null,"stack","stack",1123661306).cljs$core$IFn$_invoke$arity$1(result)))
{lt.object.raise.call(null,obj,new cljs.core.Keyword(null,"editor.eval.clj.exception","editor.eval.clj.exception",3664192387),result,new cljs.core.Keyword(null,"passed","passed",4313490402));
} else
{lt.object.raise.call(null,obj,new cljs.core.Keyword(null,"editor.result","editor.result",4030217008),new cljs.core.Keyword(null,"result","result",4374444943).cljs$core$IFn$_invoke$arity$1(result),loc_6885);
}
{
var G__6886 = cljs.core.next.call(null,seq__6781__$1);
var G__6887 = null;
var G__6888 = 0;
var G__6889 = 0;
seq__6781 = G__6886;
chunk__6783 = G__6887;
count__6784 = G__6888;
i__6785 = G__6889;
continue;
}
}
} else
{return null;
}
}
break;
}
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure","clj-result.inline-at-cursor","lt.plugins.clojure/clj-result.inline-at-cursor",4595342383),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.__BEH__clj_result__DOT__inline_at_cursor,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"editor.eval.clj.result.inline-at-cursor","editor.eval.clj.result.inline-at-cursor",1874529633),null], null), null));
lt.plugins.clojure.__BEH__clj_result__DOT__return = (function __BEH__clj_result__DOT__return(obj,res){var seq__6793 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"results","results",2111450984).cljs$core$IFn$_invoke$arity$1(res));var chunk__6795 = null;var count__6796 = 0;var i__6797 = 0;while(true){
if((i__6797 < count__6796))
{var result = cljs.core._nth.call(null,chunk__6795,i__6797);var meta_6890 = new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(res);var handler_6891 = lt.object.by_id.call(null,new cljs.core.Keyword(null,"handler","handler",1706707644).cljs$core$IFn$_invoke$arity$1(meta_6890));var ev_6892 = new cljs.core.Keyword(null,"trigger","trigger",4248979754).cljs$core$IFn$_invoke$arity$1(meta_6890);if(cljs.core.truth_(new cljs.core.Keyword(null,"stack","stack",1123661306).cljs$core$IFn$_invoke$arity$1(result)))
{lt.object.raise.call(null,obj,new cljs.core.Keyword(null,"editor.eval.clj.exception","editor.eval.clj.exception",3664192387),result,new cljs.core.Keyword(null,"passed","passed",4313490402));
} else
{lt.object.raise.call(null,handler_6891,ev_6892,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"result","result",4374444943),new cljs.core.Keyword(null,"result","result",4374444943).cljs$core$IFn$_invoke$arity$1(result),new cljs.core.Keyword(null,"meta","meta",1017252215),meta_6890], null));
}
{
var G__6893 = seq__6793;
var G__6894 = chunk__6795;
var G__6895 = count__6796;
var G__6896 = (i__6797 + 1);
seq__6793 = G__6893;
chunk__6795 = G__6894;
count__6796 = G__6895;
i__6797 = G__6896;
continue;
}
} else
{var temp__4092__auto__ = cljs.core.seq.call(null,seq__6793);if(temp__4092__auto__)
{var seq__6793__$1 = temp__4092__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,seq__6793__$1))
{var c__5632__auto__ = cljs.core.chunk_first.call(null,seq__6793__$1);{
var G__6897 = cljs.core.chunk_rest.call(null,seq__6793__$1);
var G__6898 = c__5632__auto__;
var G__6899 = cljs.core.count.call(null,c__5632__auto__);
var G__6900 = 0;
seq__6793 = G__6897;
chunk__6795 = G__6898;
count__6796 = G__6899;
i__6797 = G__6900;
continue;
}
} else
{var result = cljs.core.first.call(null,seq__6793__$1);var meta_6901 = new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(res);var handler_6902 = lt.object.by_id.call(null,new cljs.core.Keyword(null,"handler","handler",1706707644).cljs$core$IFn$_invoke$arity$1(meta_6901));var ev_6903 = new cljs.core.Keyword(null,"trigger","trigger",4248979754).cljs$core$IFn$_invoke$arity$1(meta_6901);if(cljs.core.truth_(new cljs.core.Keyword(null,"stack","stack",1123661306).cljs$core$IFn$_invoke$arity$1(result)))
{lt.object.raise.call(null,obj,new cljs.core.Keyword(null,"editor.eval.clj.exception","editor.eval.clj.exception",3664192387),result,new cljs.core.Keyword(null,"passed","passed",4313490402));
} else
{lt.object.raise.call(null,handler_6902,ev_6903,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"result","result",4374444943),new cljs.core.Keyword(null,"result","result",4374444943).cljs$core$IFn$_invoke$arity$1(result),new cljs.core.Keyword(null,"meta","meta",1017252215),meta_6901], null));
}
{
var G__6904 = cljs.core.next.call(null,seq__6793__$1);
var G__6905 = null;
var G__6906 = 0;
var G__6907 = 0;
seq__6793 = G__6904;
chunk__6795 = G__6905;
count__6796 = G__6906;
i__6797 = G__6907;
continue;
}
}
} else
{return null;
}
}
break;
}
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure","clj-result.return","lt.plugins.clojure/clj-result.return",2357480259),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.__BEH__clj_result__DOT__return,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"editor.eval.clj.result.return","editor.eval.clj.result.return",1674433109),null], null), null));
lt.plugins.clojure.__BEH__clj_exception = (function __BEH__clj_exception(obj,res,passed_QMARK_){if(cljs.core.truth_(passed_QMARK_))
{} else
{lt.objs.notifos.done_working.call(null,"");
}
var meta = new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(res);var loc = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",1017226086),(new cljs.core.Keyword(null,"end-line","end-line",2693041432).cljs$core$IFn$_invoke$arity$1(meta) - 1),new cljs.core.Keyword(null,"ch","ch",1013907415),new cljs.core.Keyword(null,"end-column","end-column",3799845882).cljs$core$IFn$_invoke$arity$2(meta,0),new cljs.core.Keyword(null,"start-line","start-line",3689311729),(new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$2(meta,1) - 1)], null);lt.objs.notifos.set_msg_BANG_.call(null,new cljs.core.Keyword(null,"result","result",4374444943).cljs$core$IFn$_invoke$arity$1(res),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",1108647146),"error"], null));
return lt.object.raise.call(null,obj,new cljs.core.Keyword(null,"editor.exception","editor.exception",3983021184),new cljs.core.Keyword(null,"stack","stack",1123661306).cljs$core$IFn$_invoke$arity$1(res),loc);
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure","clj-exception","lt.plugins.clojure/clj-exception",4618805649),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.__BEH__clj_exception,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"editor.eval.clj.exception","editor.eval.clj.exception",3664192387),null], null), null));
lt.plugins.clojure.__BEH__cljs_exception = (function __BEH__cljs_exception(obj,res,passed_QMARK_){if(cljs.core.truth_(passed_QMARK_))
{} else
{lt.objs.notifos.done_working.call(null,"");
}
var meta = new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(res);var loc = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",1017226086),(new cljs.core.Keyword(null,"end-line","end-line",2693041432).cljs$core$IFn$_invoke$arity$1(meta) - 1),new cljs.core.Keyword(null,"ch","ch",1013907415),new cljs.core.Keyword(null,"end-column","end-column",3799845882).cljs$core$IFn$_invoke$arity$1(meta),new cljs.core.Keyword(null,"start-line","start-line",3689311729),(new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(meta) - 1)], null);var msg = (function (){var or__4884__auto__ = new cljs.core.Keyword(null,"stack","stack",1123661306).cljs$core$IFn$_invoke$arity$1(res);if(cljs.core.truth_(or__4884__auto__))
{return or__4884__auto__;
} else
{return new cljs.core.Keyword(null,"ex","ex",1013907493).cljs$core$IFn$_invoke$arity$1(res);
}
})();var stack = (function (){var or__4884__auto__ = new cljs.core.Keyword(null,"stack","stack",1123661306).cljs$core$IFn$_invoke$arity$1(res);if(cljs.core.truth_(or__4884__auto__))
{return or__4884__auto__;
} else
{var or__4884__auto____$1 = (cljs.core.truth_((function (){var and__4872__auto__ = new cljs.core.Keyword(null,"ex","ex",1013907493).cljs$core$IFn$_invoke$arity$1(res);if(cljs.core.truth_(and__4872__auto__))
{return new cljs.core.Keyword(null,"ex","ex",1013907493).cljs$core$IFn$_invoke$arity$1(res).stack;
} else
{return and__4872__auto__;
}
})())?new cljs.core.Keyword(null,"ex","ex",1013907493).cljs$core$IFn$_invoke$arity$1(res).stack:(cljs.core.truth_(new cljs.core.Keyword(null,"ex","ex",1013907493).cljs$core$IFn$_invoke$arity$1(res))?(cljs.core.truth_(new cljs.core.Keyword(null,"verbatim","verbatim",3307884968).cljs$core$IFn$_invoke$arity$1(meta))?new cljs.core.Keyword(null,"ex","ex",1013907493).cljs$core$IFn$_invoke$arity$1(res):cljs.core.pr_str.call(null,new cljs.core.Keyword(null,"ex","ex",1013907493).cljs$core$IFn$_invoke$arity$1(res))):null));if(cljs.core.truth_(or__4884__auto____$1))
{return or__4884__auto____$1;
} else
{var or__4884__auto____$2 = msg;if(cljs.core.truth_(or__4884__auto____$2))
{return or__4884__auto____$2;
} else
{return "Unknown error";
}
}
}
})();lt.objs.notifos.set_msg_BANG_.call(null,msg,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",1108647146),"error"], null));
return lt.object.raise.call(null,obj,new cljs.core.Keyword(null,"editor.exception","editor.exception",3983021184),stack,loc);
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure","cljs-exception","lt.plugins.clojure/cljs-exception",2874453634),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.__BEH__cljs_exception,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"editor.eval.cljs.exception","editor.eval.cljs.exception",4479049174),null], null), null));
lt.plugins.clojure.__BEH__eval_print = (function __BEH__eval_print(this$,str){if(cljs.core.not_EQ_.call(null,"\n",new cljs.core.Keyword(null,"out","out",1014014656).cljs$core$IFn$_invoke$arity$1(str)))
{return lt.objs.console.loc_log.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"file","file",1017047278),lt.objs.files.basename.call(null,(function (){var or__4884__auto__ = new cljs.core.Keyword(null,"name","name",1017277949).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$));if(cljs.core.truth_(or__4884__auto__))
{return or__4884__auto__;
} else
{var or__4884__auto____$1 = new cljs.core.Keyword(null,"path","path",1017337751).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"info","info",1017141280).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)));if(cljs.core.truth_(or__4884__auto____$1))
{return or__4884__auto____$1;
} else
{return "unknown";
}
}
})()),new cljs.core.Keyword(null,"line","line",1017226086),(cljs.core.truth_(lt.object.has_tag_QMARK_.call(null,this$,new cljs.core.Keyword(null,"nrepl.client","nrepl.client",4747318638)))?"stdout":null),new cljs.core.Keyword(null,"id","id",1013907597),new cljs.core.Keyword(null,"id","id",1013907597).cljs$core$IFn$_invoke$arity$1(str),new cljs.core.Keyword(null,"content","content",1965434859),new cljs.core.Keyword(null,"out","out",1014014656).cljs$core$IFn$_invoke$arity$1(str)], null));
} else
{return null;
}
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure","eval-print","lt.plugins.clojure/eval-print",1103285610),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.__BEH__eval_print,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"editor.eval.clj.print","editor.eval.clj.print",3247519457),null], null), null));
lt.plugins.clojure.__BEH__eval_print_err = (function __BEH__eval_print_err(this$,str){if(cljs.core.not_EQ_.call(null,"\n",new cljs.core.Keyword(null,"out","out",1014014656).cljs$core$IFn$_invoke$arity$1(str)))
{return lt.objs.console.error.call(null,new cljs.core.Keyword(null,"out","out",1014014656).cljs$core$IFn$_invoke$arity$1(str));
} else
{return null;
}
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure","eval-print-err","lt.plugins.clojure/eval-print-err",3047771490),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.__BEH__eval_print_err,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"editor.eval.clj.print.err","editor.eval.clj.print.err",4679424472),null], null), null));
lt.plugins.clojure.__BEH__handle_cancellation = (function __BEH__handle_cancellation(this$){lt.objs.notifos.done_working.call(null);
return lt.objs.notifos.set_msg_BANG_.call(null,"Canceled clj eval.",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",1108647146),"error"], null));
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure","handle-cancellation","lt.plugins.clojure/handle-cancellation",4385398710),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.__BEH__handle_cancellation,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"editor.eval.clj.cancel","editor.eval.clj.cancel",1148758378),null], null), null));
lt.plugins.clojure.__BEH__print_length = (function __BEH__print_length(this$,res,len){return len;
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure","print-length","lt.plugins.clojure/print-length",1198483764),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.__BEH__print_length,new cljs.core.Keyword(null,"desc","desc",1016984067),"Clojure: Set the print length for eval (doesn't affect CLJS)",new cljs.core.Keyword(null,"params","params",4313443576),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"label","label",1116631654),"length",new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"number","number",4274507451)], null)], null),new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"clojure.print-length+","clojure.print-length+",4366367949),null], null), null),new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"user","user",1017503549),new cljs.core.Keyword(null,"exclusive","exclusive",2700522000),true);
lt.plugins.clojure.__BEH__java_exe = (function __BEH__java_exe(this$,path){return lt.object.merge_BANG_.call(null,lt.plugins.clojure.clj_lang,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"java-exe","java-exe",4725979993),path], null));
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure","java-exe","lt.plugins.clojure/java-exe",635643605),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.__BEH__java_exe,new cljs.core.Keyword(null,"desc","desc",1016984067),"Clojure: set the path to the Java executable for clients",new cljs.core.Keyword(null,"params","params",4313443576),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"label","label",1116631654),"path"], null)], null),new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"object.instant","object.instant",773332388),null], null), null),new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"user","user",1017503549),new cljs.core.Keyword(null,"exclusive","exclusive",2700522000),true);
lt.plugins.clojure.__BEH__connect_local = (function __BEH__connect_local(this$,path){return lt.plugins.clojure.try_connect.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"info","info",1017141280),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"path","path",1017337751),path], null)], null));
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure","connect-local","lt.plugins.clojure/connect-local",4361541622),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.__BEH__connect_local,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"connect","connect",1965255772),null], null), null));
lt.objs.sidebar.clients.add_connector.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"name","name",1017277949),"Clojure",new cljs.core.Keyword(null,"desc","desc",1016984067),"Select a project.clj to connect to.",new cljs.core.Keyword(null,"connect","connect",1965255772),(function (){return lt.objs.dialogs.file.call(null,lt.plugins.clojure.clj_lang,new cljs.core.Keyword(null,"connect","connect",1965255772));
})], null));
lt.plugins.clojure.server_input = (function server_input(){var e__6313__auto__ = crate.core.html.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input","input",1114262332),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1017479852),"text",new cljs.core.Keyword(null,"placeholder","placeholder",1612151013),"host:port",new cljs.core.Keyword(null,"value","value",1125876963),"localhost:"], null)], null));var seq__6805_6908 = cljs.core.seq.call(null,cljs.core.partition.call(null,2,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"focus","focus",1111509066),((function (e__6313__auto__){
return (function (){return lt.objs.context.in_BANG_.call(null,new cljs.core.Keyword(null,"popup.input","popup.input",4788025210));
});})(e__6313__auto__))
,new cljs.core.Keyword(null,"blur","blur",1016931289),((function (e__6313__auto__){
return (function (){return lt.objs.context.out_BANG_.call(null,new cljs.core.Keyword(null,"popup.input","popup.input",4788025210));
});})(e__6313__auto__))
], null)));var chunk__6806_6909 = null;var count__6807_6910 = 0;var i__6808_6911 = 0;while(true){
if((i__6808_6911 < count__6807_6910))
{var vec__6809_6912 = cljs.core._nth.call(null,chunk__6806_6909,i__6808_6911);var ev__6314__auto___6913 = cljs.core.nth.call(null,vec__6809_6912,0,null);var func__6315__auto___6914 = cljs.core.nth.call(null,vec__6809_6912,1,null);lt.util.dom.on.call(null,e__6313__auto__,ev__6314__auto___6913,func__6315__auto___6914);
{
var G__6915 = seq__6805_6908;
var G__6916 = chunk__6806_6909;
var G__6917 = count__6807_6910;
var G__6918 = (i__6808_6911 + 1);
seq__6805_6908 = G__6915;
chunk__6806_6909 = G__6916;
count__6807_6910 = G__6917;
i__6808_6911 = G__6918;
continue;
}
} else
{var temp__4092__auto___6919 = cljs.core.seq.call(null,seq__6805_6908);if(temp__4092__auto___6919)
{var seq__6805_6920__$1 = temp__4092__auto___6919;if(cljs.core.chunked_seq_QMARK_.call(null,seq__6805_6920__$1))
{var c__5632__auto___6921 = cljs.core.chunk_first.call(null,seq__6805_6920__$1);{
var G__6922 = cljs.core.chunk_rest.call(null,seq__6805_6920__$1);
var G__6923 = c__5632__auto___6921;
var G__6924 = cljs.core.count.call(null,c__5632__auto___6921);
var G__6925 = 0;
seq__6805_6908 = G__6922;
chunk__6806_6909 = G__6923;
count__6807_6910 = G__6924;
i__6808_6911 = G__6925;
continue;
}
} else
{var vec__6810_6926 = cljs.core.first.call(null,seq__6805_6920__$1);var ev__6314__auto___6927 = cljs.core.nth.call(null,vec__6810_6926,0,null);var func__6315__auto___6928 = cljs.core.nth.call(null,vec__6810_6926,1,null);lt.util.dom.on.call(null,e__6313__auto__,ev__6314__auto___6927,func__6315__auto___6928);
{
var G__6929 = cljs.core.next.call(null,seq__6805_6920__$1);
var G__6930 = null;
var G__6931 = 0;
var G__6932 = 0;
seq__6805_6908 = G__6929;
chunk__6806_6909 = G__6930;
count__6807_6910 = G__6931;
i__6808_6911 = G__6932;
continue;
}
}
} else
{}
}
break;
}
return e__6313__auto__;
});
lt.plugins.clojure.connect_to_remote = (function connect_to_remote(server){var vec__6812 = clojure.string.split.call(null,server,":");var host = cljs.core.nth.call(null,vec__6812,0,null);var port = cljs.core.nth.call(null,vec__6812,1,null);if(cljs.core.truth_((function (){var and__4872__auto__ = host;if(cljs.core.truth_(and__4872__auto__))
{return port;
} else
{return and__4872__auto__;
}
})()))
{var client = lt.objs.clients.client_BANG_.call(null,new cljs.core.Keyword(null,"nrepl.client.remote","nrepl.client.remote",626670570));lt.object.merge_BANG_.call(null,client,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"port","port",1017351155),port,new cljs.core.Keyword(null,"host","host",1017112858),host,new cljs.core.Keyword(null,"name","name",1017277949),server], null));
return lt.object.raise.call(null,client,new cljs.core.Keyword(null,"connect!","connect!",4735997929));
} else
{return null;
}
});
lt.plugins.clojure.remote_connect = (function remote_connect(){var input = lt.plugins.clojure.server_input.call(null);var p = lt.objs.popup.popup_BANG_.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"header","header",4087600639),"Connect to a remote nREPL server.",new cljs.core.Keyword(null,"body","body",1016933652),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1014003715),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p","p",1013904354),"In order to connect to an nrepl server, make sure the server is started (e.g. lein repl :headless)\n                                 and that you have included the lighttable.nrepl.handler/lighttable-ops middleware."], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"label","label",1116631654),"Server: "], null),input], null),new cljs.core.Keyword(null,"buttons","buttons",1255256819),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"label","label",1116631654),"cancel"], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"label","label",1116631654),"connect",new cljs.core.Keyword(null,"action","action",3885920680),((function (input){
return (function (){return lt.plugins.clojure.connect_to_remote.call(null,lt.util.dom.val.call(null,input));
});})(input))
], null)], null)], null));lt.util.dom.focus.call(null,input);
return input.setSelectionRange(1000,1000);
});
lt.objs.sidebar.clients.add_connector.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"name","name",1017277949),"Clojure (remote nREPL)",new cljs.core.Keyword(null,"desc","desc",1016984067),"Enter in the host:port address of an nREPL server to connect to",new cljs.core.Keyword(null,"connect","connect",1965255772),(function (){return lt.plugins.clojure.remote_connect.call(null);
})], null));
lt.plugins.clojure.__BEH__cljs_watch_src = (function __BEH__cljs_watch_src(editor,cur,meta,src){var meta__$1 = cljs.core.assoc.call(null,meta,new cljs.core.Keyword(null,"ev","ev",1013907491),new cljs.core.Keyword(null,"editor.eval.cljs.watch","editor.eval.cljs.watch",759571670));return [cljs.core.str("(js/lttools.watch "),cljs.core.str(src),cljs.core.str(" (clj->js "),cljs.core.str(cljs.core.pr_str.call(null,meta__$1)),cljs.core.str("))")].join('');
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure","cljs-watch-src","lt.plugins.clojure/cljs-watch-src",2461046361),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.__BEH__cljs_watch_src,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"watch.src+","watch.src+",868749304),null], null), null));
lt.plugins.clojure.__BEH__clj_watch_src = (function __BEH__clj_watch_src(editor,cur,meta,src){return [cljs.core.str("(lighttable.nrepl.eval/watch "),cljs.core.str(src),cljs.core.str(" "),cljs.core.str(cljs.core.pr_str.call(null,meta)),cljs.core.str(")")].join('');
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure","clj-watch-src","lt.plugins.clojure/clj-watch-src",2057914632),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.__BEH__clj_watch_src,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"watch.src+","watch.src+",868749304),null], null), null));
lt.plugins.clojure.fill_watch_placeholders = (function fill_watch_placeholders(exp,src,meta,watch){return clojure.string.replace.call(null,clojure.string.replace.call(null,clojure.string.replace.call(null,clojure.string.replace.call(null,clojure.string.replace.call(null,exp,"\n"," "),"__SELECTION*__",cljs.core.pr_str.call(null,src)),"__SELECTION__",src),"__ID__",cljs.core.pr_str.call(null,new cljs.core.Keyword(null,"id","id",1013907597).cljs$core$IFn$_invoke$arity$1(meta))),/__\|(.*)\|__/,watch);
});
lt.plugins.clojure.__BEH__cljs_watch_custom_src = (function __BEH__cljs_watch_custom_src(editor,cur,meta,opts,src){var watch = [cljs.core.str("(js/lttools.raise "),cljs.core.str(new cljs.core.Keyword(null,"obj","obj",1014014057).cljs$core$IFn$_invoke$arity$1(meta)),cljs.core.str(" :editor.eval.cljs.watch {:meta "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.merge.call(null,cljs.core.dissoc.call(null,opts,new cljs.core.Keyword(null,"exp","exp",1014005135)),meta))),cljs.core.str(" :result $1})")].join('');return lt.plugins.clojure.fill_watch_placeholders.call(null,new cljs.core.Keyword(null,"exp","exp",1014005135).cljs$core$IFn$_invoke$arity$1(opts),src,meta,watch);
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure","cljs-watch-custom-src","lt.plugins.clojure/cljs-watch-custom-src",1571057007),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.__BEH__cljs_watch_custom_src,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"watch.custom.src+","watch.custom.src+",509336567),null], null), null));
lt.plugins.clojure.__BEH__clj_watch_custom_src = (function __BEH__clj_watch_custom_src(editor,cur,meta,opts,src){var wrapped = (cljs.core.truth_(new cljs.core.Keyword(null,"verbatim","verbatim",3307884968).cljs$core$IFn$_invoke$arity$1(opts))?"$1":"(pr-str $1)");var watch = [cljs.core.str("(lighttable.nrepl.core/safe-respond-to "),cljs.core.str(new cljs.core.Keyword(null,"obj","obj",1014014057).cljs$core$IFn$_invoke$arity$1(meta)),cljs.core.str(" :editor.eval.clj.watch {:meta "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.merge.call(null,cljs.core.dissoc.call(null,opts,new cljs.core.Keyword(null,"exp","exp",1014005135)),meta))),cljs.core.str(" :result "),cljs.core.str(wrapped),cljs.core.str("})")].join('');return lt.plugins.clojure.fill_watch_placeholders.call(null,new cljs.core.Keyword(null,"exp","exp",1014005135).cljs$core$IFn$_invoke$arity$1(opts),src,meta,watch);
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure","clj-watch-custom-src","lt.plugins.clojure/clj-watch-custom-src",2902894400),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.__BEH__clj_watch_custom_src,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"watch.custom.src+","watch.custom.src+",509336567),null], null), null));
lt.plugins.clojure.__BEH__cljs_watch_result = (function __BEH__cljs_watch_result(editor,res){var temp__4092__auto__ = cljs.core.get.call(null,new cljs.core.Keyword(null,"watches","watches",2139868463).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,editor)),new cljs.core.Keyword(null,"id","id",1013907597).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(res)));if(cljs.core.truth_(temp__4092__auto__))
{var watch = temp__4092__auto__;var str_result = ((cljs.core.not.call(null,new cljs.core.Keyword(null,"verbatim","verbatim",3307884968).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(res))))?cljs.core.pr_str.call(null,new cljs.core.Keyword(null,"result","result",4374444943).cljs$core$IFn$_invoke$arity$1(res)):new cljs.core.Keyword(null,"result","result",4374444943).cljs$core$IFn$_invoke$arity$1(res));var str_result__$1 = ((cljs.core._EQ_.call(null,str_result,"#<[object Object]>"))?lt.objs.console.util_inspect.call(null,new cljs.core.Keyword(null,"result","result",4374444943).cljs$core$IFn$_invoke$arity$1(res),false,1):str_result);var str_result__$2 = lt.util.js.escape.call(null,str_result__$1);return lt.object.raise.call(null,new cljs.core.Keyword(null,"inline-result","inline-result",656479555).cljs$core$IFn$_invoke$arity$1(watch),new cljs.core.Keyword(null,"update!","update!",779473898),str_result__$2);
} else
{return null;
}
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure","cljs-watch-result","lt.plugins.clojure/cljs-watch-result",3139140708),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.__BEH__cljs_watch_result,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"editor.eval.cljs.watch","editor.eval.cljs.watch",759571670),null], null), null));
lt.plugins.clojure.__BEH__clj_watch_result = (function __BEH__clj_watch_result(editor,res){var temp__4092__auto__ = cljs.core.get.call(null,new cljs.core.Keyword(null,"watches","watches",2139868463).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,editor)),new cljs.core.Keyword(null,"id","id",1013907597).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(res)));if(cljs.core.truth_(temp__4092__auto__))
{var watch = temp__4092__auto__;var str_result = new cljs.core.Keyword(null,"result","result",4374444943).cljs$core$IFn$_invoke$arity$1(res);var str_result__$1 = lt.util.js.escape.call(null,str_result);return lt.object.raise.call(null,new cljs.core.Keyword(null,"inline-result","inline-result",656479555).cljs$core$IFn$_invoke$arity$1(watch),new cljs.core.Keyword(null,"update!","update!",779473898),str_result__$1);
} else
{return null;
}
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure","clj-watch-result","lt.plugins.clojure/clj-watch-result",2647848757),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.__BEH__clj_watch_result,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"editor.eval.clj.watch","editor.eval.clj.watch",3253487875),null], null), null));
lt.plugins.clojure.__BEH__clj_doc = (function __BEH__clj_doc(editor){var token = lt.plugins.clojure.find_symbol_at_cursor.call(null,editor);var command = new cljs.core.Keyword(null,"editor.clj.doc","editor.clj.doc",4087602908);var info = cljs.core.assoc.call(null,cljs.core.deref.call(null,editor).call(null,new cljs.core.Keyword(null,"info","info",1017141280)),new cljs.core.Keyword(null,"result-type","result-type",4725630556),new cljs.core.Keyword(null,"doc","doc",1014003882),new cljs.core.Keyword(null,"loc","loc",1014011570),new cljs.core.Keyword(null,"loc","loc",1014011570).cljs$core$IFn$_invoke$arity$1(token),new cljs.core.Keyword(null,"sym","sym",1014018617),new cljs.core.Keyword(null,"string","string",4416885635).cljs$core$IFn$_invoke$arity$1(token),new cljs.core.Keyword(null,"print-length","print-length",3960797560),lt.object.raise_reduce.call(null,editor,new cljs.core.Keyword(null,"clojure.print-length+","clojure.print-length+",4366367949),null),new cljs.core.Keyword(null,"code","code",1016963423),lt.plugins.watches.watched_range.call(null,editor,null,null,null));if(cljs.core.truth_(token))
{return lt.objs.clients.send.call(null,lt.objs.eval.get_client_BANG_.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",1964298941),command,new cljs.core.Keyword(null,"info","info",1017141280),info,new cljs.core.Keyword(null,"origin","origin",4300251800),editor,new cljs.core.Keyword(null,"create","create",3956577390),lt.plugins.clojure.try_connect], null)),command,info,new cljs.core.Keyword(null,"only","only",1017320222),editor);
} else
{return null;
}
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure","clj-doc","lt.plugins.clojure/clj-doc",3420806554),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.__BEH__clj_doc,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"editor.doc","editor.doc",3751347369),null], null), null));
lt.plugins.clojure.__BEH__print_clj_doc = (function __BEH__print_clj_doc(editor,result){if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"doc","doc",1014003882),new cljs.core.Keyword(null,"result-type","result-type",4725630556).cljs$core$IFn$_invoke$arity$1(result)))
{if(cljs.core.not.call(null,result))
{return lt.objs.notifos.set_msg_BANG_.call(null,"No docs found.",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",1108647146),"error"], null));
} else
{return lt.object.raise.call(null,editor,new cljs.core.Keyword(null,"editor.doc.show!","editor.doc.show!",1417900223),result);
}
} else
{return null;
}
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure","print-clj-doc","lt.plugins.clojure/print-clj-doc",4500673082),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.__BEH__print_clj_doc,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"editor.clj.doc","editor.clj.doc",4087602908),null], null), null));
lt.plugins.clojure.symbol_token_QMARK_ = (function symbol_token_QMARK_(s){return cljs.core.re_seq.call(null,/[\w\$_\-\.\*\+\\/\?\><!]/,s);
});
lt.plugins.clojure.find_symbol_at_cursor = (function find_symbol_at_cursor(editor){var loc = lt.objs.editor.__GT_cursor.call(null,editor);var token_left = lt.objs.editor.__GT_token.call(null,editor,loc);var token_right = lt.objs.editor.__GT_token.call(null,editor,cljs.core.update_in.call(null,loc,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ch","ch",1013907415)], null),cljs.core.inc));var or__4884__auto__ = (cljs.core.truth_(lt.plugins.clojure.symbol_token_QMARK_.call(null,new cljs.core.Keyword(null,"string","string",4416885635).cljs$core$IFn$_invoke$arity$1(token_right)))?cljs.core.assoc.call(null,token_right,new cljs.core.Keyword(null,"loc","loc",1014011570),loc):null);if(cljs.core.truth_(or__4884__auto__))
{return or__4884__auto__;
} else
{if(cljs.core.truth_(lt.plugins.clojure.symbol_token_QMARK_.call(null,new cljs.core.Keyword(null,"string","string",4416885635).cljs$core$IFn$_invoke$arity$1(token_left))))
{return cljs.core.assoc.call(null,token_left,new cljs.core.Keyword(null,"loc","loc",1014011570),loc);
} else
{return null;
}
}
});
lt.plugins.clojure.__BEH__cljs_doc = (function __BEH__cljs_doc(editor){var token = lt.plugins.clojure.find_symbol_at_cursor.call(null,editor);var command = new cljs.core.Keyword(null,"editor.cljs.doc","editor.cljs.doc",1871386511);var info = cljs.core.assoc.call(null,cljs.core.deref.call(null,editor).call(null,new cljs.core.Keyword(null,"info","info",1017141280)),new cljs.core.Keyword(null,"result-type","result-type",4725630556),new cljs.core.Keyword(null,"doc","doc",1014003882),new cljs.core.Keyword(null,"loc","loc",1014011570),new cljs.core.Keyword(null,"loc","loc",1014011570).cljs$core$IFn$_invoke$arity$1(token),new cljs.core.Keyword(null,"sym","sym",1014018617),new cljs.core.Keyword(null,"string","string",4416885635).cljs$core$IFn$_invoke$arity$1(token),new cljs.core.Keyword(null,"print-length","print-length",3960797560),lt.object.raise_reduce.call(null,editor,new cljs.core.Keyword(null,"clojure.print-length+","clojure.print-length+",4366367949),null),new cljs.core.Keyword(null,"code","code",1016963423),lt.plugins.watches.watched_range.call(null,editor,null,null,null));if(cljs.core.truth_(token))
{return lt.objs.clients.send.call(null,lt.objs.eval.get_client_BANG_.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",1964298941),command,new cljs.core.Keyword(null,"info","info",1017141280),info,new cljs.core.Keyword(null,"origin","origin",4300251800),editor,new cljs.core.Keyword(null,"create","create",3956577390),lt.plugins.clojure.try_connect], null)),command,info,new cljs.core.Keyword(null,"only","only",1017320222),editor);
} else
{return null;
}
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure","cljs-doc","lt.plugins.clojure/cljs-doc",3231894347),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.__BEH__cljs_doc,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"editor.doc","editor.doc",3751347369),null], null), null));
lt.plugins.clojure.__BEH__print_cljs_doc = (function __BEH__print_cljs_doc(editor,result){if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"doc","doc",1014003882),new cljs.core.Keyword(null,"result-type","result-type",4725630556).cljs$core$IFn$_invoke$arity$1(result)))
{if(cljs.core.not.call(null,result))
{return lt.objs.notifos.set_msg_BANG_.call(null,"No docs found.",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",1108647146),"error"], null));
} else
{return lt.object.raise.call(null,editor,new cljs.core.Keyword(null,"editor.doc.show!","editor.doc.show!",1417900223),result);
}
} else
{return null;
}
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure","print-cljs-doc","lt.plugins.clojure/print-cljs-doc",3683800747),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.__BEH__print_cljs_doc,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"editor.cljs.doc","editor.cljs.doc",1871386511),null], null), null));
lt.plugins.clojure.__BEH__clj_doc_search = (function __BEH__clj_doc_search(this$,cur){return cljs.core.conj.call(null,cur,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"label","label",1116631654),"clj",new cljs.core.Keyword(null,"trigger","trigger",4248979754),new cljs.core.Keyword(null,"docs.clj.search","docs.clj.search",4491771930),new cljs.core.Keyword(null,"file-types","file-types",1727875162),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, ["Clojure",null], null), null)], null));
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure","clj-doc-search","lt.plugins.clojure/clj-doc-search",3027523383),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.__BEH__clj_doc_search,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"types+","types+",4450069060),null], null), null));
lt.plugins.clojure.__BEH__cljs_doc_search = (function __BEH__cljs_doc_search(this$,cur){return cljs.core.conj.call(null,cur,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"label","label",1116631654),"cljs",new cljs.core.Keyword(null,"trigger","trigger",4248979754),new cljs.core.Keyword(null,"docs.cljs.search","docs.cljs.search",744247267),new cljs.core.Keyword(null,"file-types","file-types",1727875162),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, ["ClojureScript",null], null), null)], null));
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure","cljs-doc-search","lt.plugins.clojure/cljs-doc-search",4787102758),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.__BEH__cljs_doc_search,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"types+","types+",4450069060),null], null), null));
lt.plugins.clojure.__BEH__trigger_update_hints = (function __BEH__trigger_update_hints(editor,res){var temp__4092__auto__ = new cljs.core.Keyword(null,"default","default",2558708147).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"client","client",3951159101).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,editor)));if(cljs.core.truth_(temp__4092__auto__))
{var default_client = temp__4092__auto__;if(cljs.core.truth_(cljs.core.deref.call(null,default_client)))
{var info = new cljs.core.Keyword(null,"info","info",1017141280).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,editor));var command = lt.util.cljs.__GT_dottedkw.call(null,new cljs.core.Keyword(null,"editor","editor",4001043679),lt.plugins.clojure.mime__GT_type.call(null,new cljs.core.Keyword(null,"mime","mime",1017255846).cljs$core$IFn$_invoke$arity$1(info)),new cljs.core.Keyword(null,"hints","hints",1113187902));return lt.objs.clients.send.call(null,lt.objs.eval.get_client_BANG_.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",1964298941),command,new cljs.core.Keyword(null,"info","info",1017141280),info,new cljs.core.Keyword(null,"origin","origin",4300251800),editor,new cljs.core.Keyword(null,"create","create",3956577390),lt.plugins.clojure.try_connect], null)),command,info,new cljs.core.Keyword(null,"only","only",1017320222),editor);
} else
{return null;
}
} else
{return null;
}
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure","trigger-update-hints","lt.plugins.clojure/trigger-update-hints",637844971),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.__BEH__trigger_update_hints,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"editor.clj.hints.update!","editor.clj.hints.update!",4087618170),null], null), null),new cljs.core.Keyword(null,"debounce","debounce",1556599227),100);
lt.plugins.clojure.__BEH__finish_update_hints = (function __BEH__finish_update_hints(editor,res){lt.object.merge_BANG_.call(null,editor,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("lt.plugins.clojure","hints","lt.plugins.clojure/hints",1865050586),res], null));
return lt.object.raise.call(null,lt.plugins.auto_complete.hinter,new cljs.core.Keyword(null,"refresh!","refresh!",4597922840));
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure","finish-update-hints","lt.plugins.clojure/finish-update-hints",2858924784),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.__BEH__finish_update_hints,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"editor.clj.hints.result","editor.clj.hints.result",878928639),null,new cljs.core.Keyword(null,"editor.cljs.hints.result","editor.cljs.hints.result",4503978924),null], null), null));
lt.plugins.clojure.__BEH__use_local_hints = (function __BEH__use_local_hints(editor,hints,token){if(cljs.core.not_EQ_.call(null,token,new cljs.core.Keyword("lt.plugins.clojure","token","lt.plugins.clojure/token",1849570503).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,editor))))
{lt.object.merge_BANG_.call(null,editor,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("lt.plugins.clojure","token","lt.plugins.clojure/token",1849570503),token], null));
lt.object.raise.call(null,editor,new cljs.core.Keyword(null,"editor.clj.hints.update!","editor.clj.hints.update!",4087618170));
} else
{}
var temp__4090__auto__ = new cljs.core.Keyword("lt.plugins.clojure","hints","lt.plugins.clojure/hints",1865050586).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,editor));if(cljs.core.truth_(temp__4090__auto__))
{var clj_hints = temp__4090__auto__;return cljs.core.concat.call(null,clj_hints,hints);
} else
{return hints;
}
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure","use-local-hints","lt.plugins.clojure/use-local-hints",1745662354),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.__BEH__use_local_hints,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"hints+","hints+",4091697745),null], null), null));
lt.plugins.clojure.__BEH__jump_to_definition_at_cursor = (function __BEH__jump_to_definition_at_cursor(editor){var token = lt.plugins.clojure.find_symbol_at_cursor.call(null,editor);if(cljs.core.truth_(token))
{return lt.object.raise.call(null,editor,new cljs.core.Keyword(null,"editor.jump-to-definition!","editor.jump-to-definition!",3261820364),new cljs.core.Keyword(null,"string","string",4416885635).cljs$core$IFn$_invoke$arity$1(token));
} else
{return null;
}
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure","jump-to-definition-at-cursor","lt.plugins.clojure/jump-to-definition-at-cursor",4528034967),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.__BEH__jump_to_definition_at_cursor,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"editor.jump-to-definition-at-cursor!","editor.jump-to-definition-at-cursor!",4501637705),null], null), null));
lt.plugins.clojure.__BEH__start_jump_to_definition = (function __BEH__start_jump_to_definition(editor,string){var info = new cljs.core.Keyword(null,"info","info",1017141280).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,editor));var command = lt.util.cljs.__GT_dottedkw.call(null,new cljs.core.Keyword(null,"editor","editor",4001043679),lt.plugins.clojure.mime__GT_type.call(null,new cljs.core.Keyword(null,"mime","mime",1017255846).cljs$core$IFn$_invoke$arity$1(info)),new cljs.core.Keyword(null,"doc","doc",1014003882));var info__$1 = cljs.core.assoc.call(null,info,new cljs.core.Keyword(null,"result-type","result-type",4725630556),new cljs.core.Keyword(null,"jump","jump",1017178016),new cljs.core.Keyword(null,"sym","sym",1014018617),string);return lt.objs.clients.send.call(null,lt.objs.eval.get_client_BANG_.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",1964298941),command,new cljs.core.Keyword(null,"info","info",1017141280),info__$1,new cljs.core.Keyword(null,"origin","origin",4300251800),editor,new cljs.core.Keyword(null,"create","create",3956577390),lt.plugins.clojure.try_connect], null)),command,info__$1,new cljs.core.Keyword(null,"only","only",1017320222),editor);
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure","start-jump-to-definition","lt.plugins.clojure/start-jump-to-definition",3332644575),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.__BEH__start_jump_to_definition,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"editor.jump-to-definition!","editor.jump-to-definition!",3261820364),null], null), null));
lt.plugins.clojure.__BEH__finish_jump_to_definition = (function __BEH__finish_jump_to_definition(editor,p__6813){var map__6815 = p__6813;var map__6815__$1 = ((cljs.core.seq_QMARK_.call(null,map__6815))?cljs.core.apply.call(null,cljs.core.hash_map,map__6815):map__6815);var res = map__6815__$1;var line = cljs.core.get.call(null,map__6815__$1,new cljs.core.Keyword(null,"line","line",1017226086));var file = cljs.core.get.call(null,map__6815__$1,new cljs.core.Keyword(null,"file","file",1017047278));if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"jump","jump",1017178016),new cljs.core.Keyword(null,"result-type","result-type",4725630556).cljs$core$IFn$_invoke$arity$1(res)))
{if(cljs.core.truth_((function (){var and__4872__auto__ = res;if(cljs.core.truth_(and__4872__auto__))
{var and__4872__auto____$1 = file;if(cljs.core.truth_(and__4872__auto____$1))
{return line;
} else
{return and__4872__auto____$1;
}
} else
{return and__4872__auto__;
}
})()))
{return lt.object.raise.call(null,lt.objs.jump_stack.jump_stack,new cljs.core.Keyword(null,"jump-stack.push!","jump-stack.push!",4063822260),editor,file,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"line","line",1017226086),(line - 1),new cljs.core.Keyword(null,"ch","ch",1013907415),0], null));
} else
{return lt.objs.notifos.set_msg_BANG_.call(null,"Definition not found",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",1108647146),"error"], null));
}
} else
{return null;
}
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure","finish-jump-to-definition","lt.plugins.clojure/finish-jump-to-definition",1365139246),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.__BEH__finish_jump_to_definition,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"editor.clj.doc","editor.clj.doc",4087602908),null,new cljs.core.Keyword(null,"editor.cljs.doc","editor.cljs.doc",1871386511),null], null), null));
lt.plugins.clojure.__BEH__on_out = (function __BEH__on_out(this$,data){var out = data.toString();lt.objs.console.core_log.write([cljs.core.str(new cljs.core.Keyword(null,"name","name",1017277949).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$))),cljs.core.str("[stdout]: "),cljs.core.str(data)].join(''));
lt.object.update_BANG_.call(null,this$,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"buffer","buffer",3930752946)], null),cljs.core.str,out);
if((out.indexOf("nREPL server started") > -1))
{lt.objs.notifos.done_working.call(null);
lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"connected","connected",4729661051),true], null));
var client = lt.objs.clients.by_id.call(null,new cljs.core.Keyword(null,"cid","cid",1014002736).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)));lt.object.merge_BANG_.call(null,client,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"port","port",1017351155),cljs.core.second.call(null,cljs.core.first.call(null,cljs.core.re_seq.call(null,/port ([\d]+)/,out)))], null));
return lt.object.raise.call(null,client,new cljs.core.Keyword(null,"connect!","connect!",4735997929));
} else
{if(cljs.core.truth_(new cljs.core.Keyword(null,"connected","connected",4729661051).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$))))
{return null;
} else
{return lt.objs.notifos.set_msg_BANG_.call(null,"Retrieving deps.. ",cljs.core.PersistentArrayMap.EMPTY);
}
}
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure","on-out","lt.plugins.clojure/on-out",995575118),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.__BEH__on_out,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"proc.out","proc.out",4302083112),null], null), null));
lt.plugins.clojure.__BEH__on_error = (function __BEH__on_error(this$,data){var out = data.toString();lt.objs.console.core_log.write([cljs.core.str(new cljs.core.Keyword(null,"name","name",1017277949).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$))),cljs.core.str("[stderr]: "),cljs.core.str(data)].join(''));
if((new cljs.core.Keyword(null,"buffer","buffer",3930752946).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)).indexOf("nREPL server started") > -1))
{return null;
} else
{return lt.object.update_BANG_.call(null,this$,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"buffer","buffer",3930752946)], null),cljs.core.str,data);
}
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure","on-error","lt.plugins.clojure/on-error",1623592872),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.__BEH__on_error,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"proc.error","proc.error",4143512802),null], null), null));
lt.plugins.clojure.__BEH__on_exit = (function __BEH__on_exit(this$,data){if(cljs.core.truth_(new cljs.core.Keyword(null,"connected","connected",4729661051).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$))))
{} else
{lt.objs.notifos.done_working.call(null);
lt.objs.notifos.done_working.call(null);
lt.objs.popup.popup_BANG_.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"header","header",4087600639),"We couldn't connect.",new cljs.core.Keyword(null,"body","body",1016933652),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1017440956),"Looks like there was an issue trying to connect\n                                              to the project. Here's what we got:",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"pre","pre",1014015509),new cljs.core.Keyword(null,"buffer","buffer",3930752946).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$))], null)], null),new cljs.core.Keyword(null,"buttons","buttons",1255256819),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"label","label",1116631654),"close"], null)], null)], null));
lt.objs.notifos.set_msg_BANG_.call(null,"Failed to connect",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",1108647146),"error"], null));
lt.objs.clients.rem_BANG_.call(null,lt.objs.clients.by_id.call(null,new cljs.core.Keyword(null,"cid","cid",1014002736).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$))));
}
lt.objs.proc.kill_all.call(null,new cljs.core.Keyword(null,"procs","procs",1120844623).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)));
return lt.object.destroy_BANG_.call(null,this$);
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure","on-exit","lt.plugins.clojure/on-exit",1190248282),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.__BEH__on_exit,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"proc.exit","proc.exit",4162906152),null], null), null));
lt.object.object_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure","connecting-notifier","lt.plugins.clojure/connecting-notifier",1801195529),new cljs.core.Keyword(null,"triggers","triggers",2516997421),cljs.core.PersistentVector.EMPTY,new cljs.core.Keyword(null,"behaviors","behaviors",607554515),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("lt.plugins.clojure","on-exit","lt.plugins.clojure/on-exit",1190248282),new cljs.core.Keyword("lt.plugins.clojure","on-error","lt.plugins.clojure/on-error",1623592872),new cljs.core.Keyword("lt.plugins.clojure","on-out","lt.plugins.clojure/on-out",995575118)], null),new cljs.core.Keyword(null,"init","init",1017141378),(function (this$,notifier,cid){lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"notifier","notifier",2599267608),notifier,new cljs.core.Keyword(null,"buffer","buffer",3930752946),"",new cljs.core.Keyword(null,"cid","cid",1014002736),cid], null));
return null;
}));
lt.plugins.clojure.wrap_quotes = (function wrap_quotes(s){return [cljs.core.str("\""),cljs.core.str(s),cljs.core.str("\"")].join('');
});
lt.plugins.clojure.windows_escape = (function windows_escape(s){if(cljs.core.truth_((function (){var and__4872__auto__ = lt.util.cljs.str_contains_QMARK_.call(null,s," ");if(cljs.core.truth_(and__4872__auto__))
{return lt.objs.platform.win_QMARK_.call(null);
} else
{return and__4872__auto__;
}
})()))
{return lt.plugins.clojure.wrap_quotes.call(null,s);
} else
{return s;
}
});
lt.plugins.clojure.jar_command = (function jar_command(path,name,client){return [cljs.core.str((function (){var or__4884__auto__ = new cljs.core.Keyword(null,"java-exe","java-exe",4725979993).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.plugins.clojure.clj_lang));if(cljs.core.truth_(or__4884__auto__))
{return or__4884__auto__;
} else
{return "java";
}
})()),cljs.core.str(" -jar "),cljs.core.str(lt.plugins.clojure.windows_escape.call(null,lt.plugins.clojure.jar_path)),cljs.core.str(" "),cljs.core.str(name)].join('');
});
lt.plugins.clojure.run_jar = (function run_jar(p__6816){var map__6818 = p__6816;var map__6818__$1 = ((cljs.core.seq_QMARK_.call(null,map__6818))?cljs.core.apply.call(null,cljs.core.hash_map,map__6818):map__6818);var client = cljs.core.get.call(null,map__6818__$1,new cljs.core.Keyword(null,"client","client",3951159101));var name = cljs.core.get.call(null,map__6818__$1,new cljs.core.Keyword(null,"name","name",1017277949));var project_path = cljs.core.get.call(null,map__6818__$1,new cljs.core.Keyword(null,"project-path","project-path",1907176907));var path = cljs.core.get.call(null,map__6818__$1,new cljs.core.Keyword(null,"path","path",1017337751));var obj = lt.object.create.call(null,new cljs.core.Keyword("lt.plugins.clojure","connecting-notifier","lt.plugins.clojure/connecting-notifier",1801195529),lt.plugins.clojure.n,lt.objs.clients.__GT_id.call(null,client));var args = new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["-Xmx1g","-jar",lt.plugins.clojure.windows_escape.call(null,lt.plugins.clojure.jar_path)], null);lt.objs.notifos.working.call(null,"Connecting..");
lt.objs.console.core_log.write([cljs.core.str("STARTING CLIENT: "),cljs.core.str(lt.plugins.clojure.jar_command.call(null,project_path,name,client))].join(''));
lt.objs.proc.exec.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",1964298941),(function (){var or__4884__auto__ = new cljs.core.Keyword(null,"java-exe","java-exe",4725979993).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.plugins.clojure.clj_lang));if(cljs.core.truth_(or__4884__auto__))
{return or__4884__auto__;
} else
{return "java";
}
})(),new cljs.core.Keyword(null,"args","args",1016906831),(cljs.core.truth_(name)?cljs.core.conj.call(null,args,name):args),new cljs.core.Keyword(null,"cwd","cwd",1014003170),project_path,new cljs.core.Keyword(null,"obj","obj",1014014057),obj], null));
lt.object.merge_BANG_.call(null,client,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"dir","dir",1014003711),project_path], null));
return lt.object.raise.call(null,client,new cljs.core.Keyword(null,"try-connect!","try-connect!",1801329595));
});
lt.plugins.clojure.run_local_server = (function run_local_server(client){return lt.plugins.clojure.check_all.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"path","path",1017337751),lt.plugins.clojure.local_project_clj,new cljs.core.Keyword(null,"client","client",3951159101),client,new cljs.core.Keyword(null,"name","name",1017277949),lt.plugins.clojure.local_name], null));
});
lt.plugins.clojure.check_java = (function check_java(obj){return cljs.core.assoc.call(null,obj,new cljs.core.Keyword(null,"java","java",1017159060),(function (){var or__4884__auto__ = new cljs.core.Keyword(null,"java-exe","java-exe",4725979993).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.plugins.clojure.clj_lang));if(cljs.core.truth_(or__4884__auto__))
{return or__4884__auto__;
} else
{var or__4884__auto____$1 = (process.env["JAVA_HOME"]);if(cljs.core.truth_(or__4884__auto____$1))
{return or__4884__auto____$1;
} else
{return lt.plugins.clojure.shell.which("java");
}
}
})());
});
lt.plugins.clojure.check_ltjar = (function check_ltjar(obj){return cljs.core.assoc.call(null,obj,new cljs.core.Keyword(null,"ltjar","ltjar",1117205253),lt.objs.files.exists_QMARK_.call(null,lt.plugins.clojure.jar_path));
});
lt.plugins.clojure.find_project = (function find_project(obj){var temp__4090__auto__ = lt.objs.files.walk_up_find.call(null,new cljs.core.Keyword(null,"path","path",1017337751).cljs$core$IFn$_invoke$arity$1(obj),"project.clj");if(cljs.core.truth_(temp__4090__auto__))
{var path = temp__4090__auto__;return cljs.core.assoc.call(null,obj,new cljs.core.Keyword(null,"project-path","project-path",1907176907),lt.objs.files.parent.call(null,path));
} else
{return cljs.core.assoc.call(null,obj,new cljs.core.Keyword(null,"project-path","project-path",1907176907),null);
}
});
lt.plugins.clojure.notify = (function notify(obj){var map__6820 = obj;var map__6820__$1 = ((cljs.core.seq_QMARK_.call(null,map__6820))?cljs.core.apply.call(null,cljs.core.hash_map,map__6820):map__6820);var ltjar = cljs.core.get.call(null,map__6820__$1,new cljs.core.Keyword(null,"ltjar","ltjar",1117205253));var path = cljs.core.get.call(null,map__6820__$1,new cljs.core.Keyword(null,"path","path",1017337751));var project_path = cljs.core.get.call(null,map__6820__$1,new cljs.core.Keyword(null,"project-path","project-path",1907176907));var java = cljs.core.get.call(null,map__6820__$1,new cljs.core.Keyword(null,"java","java",1017159060));if((cljs.core.not.call(null,java)) || (cljs.core.empty_QMARK_.call(null,java)))
{lt.objs.popup.popup_BANG_.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"header","header",4087600639),"We couldn't find java.",new cljs.core.Keyword(null,"body","body",1016933652),"Clojure evaluation requires the JDK to be installed.",new cljs.core.Keyword(null,"buttons","buttons",1255256819),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"label","label",1116631654),"Download the JDK",new cljs.core.Keyword(null,"action","action",3885920680),((function (map__6820,map__6820__$1,ltjar,path,project_path,java){
return (function (){return lt.objs.platform.open.call(null,"http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html");
});})(map__6820,map__6820__$1,ltjar,path,project_path,java))
], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"label","label",1116631654),"ok"], null)], null)], null));
} else
{if(cljs.core.not.call(null,ltjar))
{lt.objs.deploy.deploy.call(null);
lt.plugins.clojure.run_jar.call(null,obj);
} else
{if(cljs.core.not.call(null,project_path))
{lt.objs.console.error.call(null,[cljs.core.str("Couldn't find a project.clj in any parent of "),cljs.core.str(path)].join(''));
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{lt.plugins.clojure.run_jar.call(null,obj);
} else
{}
}
}
}
return obj;
});
lt.plugins.clojure.check_all = (function check_all(obj){lt.plugins.clojure.notify.call(null,lt.plugins.clojure.find_project.call(null,lt.plugins.clojure.check_ltjar.call(null,lt.plugins.clojure.check_java.call(null,obj))));
return new cljs.core.Keyword(null,"client","client",3951159101).cljs$core$IFn$_invoke$arity$1(obj);
});
lt.object.object_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure","langs.clj","lt.plugins.clojure/langs.clj",2726789830),new cljs.core.Keyword(null,"tags","tags",1017456523),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"clojure.lang","clojure.lang",4535056938),null], null), null));
lt.plugins.clojure.clj_lang = lt.object.create.call(null,new cljs.core.Keyword("lt.plugins.clojure","langs.clj","lt.plugins.clojure/langs.clj",2726789830));
/**
* Relative paths to search for when connecting to a Clojurescript Browser.
*/
lt.plugins.clojure.cljs_browser_paths = cljs.core.PersistentVector.EMPTY;
lt.plugins.clojure.__BEH__set_cljs_browser_paths = (function __BEH__set_cljs_browser_paths(this$,paths){return lt.plugins.clojure.cljs_browser_paths = paths;
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure","set-cljs-browser-paths","lt.plugins.clojure/set-cljs-browser-paths",2672485639),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.__BEH__set_cljs_browser_paths,new cljs.core.Keyword(null,"desc","desc",1016984067),"Clojure: Set relative paths or urls to check for and use in ClojureScript Browser",new cljs.core.Keyword(null,"params","params",4313443576),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"label","label",1116631654),"paths"], null)], null),new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"object.instant","object.instant",773332388),null], null), null),new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"user","user",1017503549));
/**
* Searches cljs-browser-paths for first url or relative path to exist and returns it.
*/
lt.plugins.clojure.find_cljs_browser_url = (function find_cljs_browser_url(ed){var project_dir = lt.objs.files.parent.call(null,lt.objs.files.walk_up_find.call(null,cljs.core.get_in.call(null,cljs.core.deref.call(null,ed),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"info","info",1017141280),new cljs.core.Keyword(null,"path","path",1017337751)], null)),"project.clj"));return cljs.core.some.call(null,((function (project_dir){
return (function (p1__6821_SHARP_){if(cljs.core.truth_(cljs.core.re_find.call(null,/^https?:\/\//,p1__6821_SHARP_)))
{return p1__6821_SHARP_;
} else
{if(cljs.core.truth_(lt.objs.files.exists_QMARK_.call(null,lt.objs.files.join.call(null,project_dir,p1__6821_SHARP_))))
{return [cljs.core.str("file://"),cljs.core.str(lt.objs.files.join.call(null,project_dir,p1__6821_SHARP_))].join('');
} else
{return null;
}
}
});})(project_dir))
,lt.plugins.clojure.cljs_browser_paths);
});
lt.objs.sidebar.clients.add_connector.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"name","name",1017277949),"ClojureScript Browser",new cljs.core.Keyword(null,"desc","desc",1016984067),"Open a browser tab to eval ClojureScript",new cljs.core.Keyword(null,"connect","connect",1965255772),(function (){var ed = lt.objs.editor.pool.last_active.call(null);var default_url = lt.plugins.clojure.find_cljs_browser_url.call(null,ed);lt.objs.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"add-browser-tab","add-browser-tab",3663273910),default_url);
if(cljs.core.truth_(default_url))
{return lt.objs.tabs.active_BANG_.call(null,ed);
} else
{return setTimeout(((function (ed,default_url){
return (function (){return lt.objs.notifos.set_msg_BANG_.call(null,"No file or url found for cljs connection. Enter a valid one in the browser",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",1108647146),"error"], null));
});})(ed,default_url))
,10000);
}
})], null));
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"client.refresh-connection","client.refresh-connection",534396805),new cljs.core.Keyword(null,"desc","desc",1016984067),"Client: Refresh client connection",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){var temp__4092__auto__ = new cljs.core.Keyword(null,"exec","exec",1017031683).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"client","client",3951159101).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.objs.editor.pool.last_active.call(null))));if(cljs.core.truth_(temp__4092__auto__))
{var client = temp__4092__auto__;return lt.object.raise.call(null,client,new cljs.core.Keyword(null,"client.refresh!","client.refresh!",1210437339));
} else
{return null;
}
})], null));
}

//# sourceMappingURL=clojure_compiled.js.map