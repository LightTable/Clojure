if(!lt.util.load.provided_QMARK_('lt.plugins.clojure.nrepl')) {
goog.provide('lt.plugins.clojure.nrepl');
goog.require('cljs.core');
goog.require('lt.util.load');
goog.require('lt.util.cljs');
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
lt.plugins.clojure.nrepl.decode = (function decode(client,failed_recently_QMARK_){var buffer = new cljs.core.Keyword(null,"buffer","buffer",3930752946).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,client));var msg = cljs.core.deref.call(null,buffer);var msgs = [];var msg_8593__$1 = msg;while(true){
if((msg_8593__$1.length <= 0))
{cljs.core.reset_BANG_.call(null,buffer,null);
} else
{try{var neue_8594 = lt.util.cljs.js__GT_clj.call(null,lt.plugins.clojure.nrepl.bencode.decode(msg_8593__$1,"utf-8"),new cljs.core.Keyword(null,"keywordize-keys","keywordize-keys",4191781672),true);var pos_8595 = lt.plugins.clojure.nrepl.bencode.decode.position;msgs.push(neue_8594);
if(cljs.core.truth_((function (){var and__6746__auto__ = pos_8595;if(cljs.core.truth_(and__6746__auto__))
{return (pos_8595 >= msg_8593__$1.length);
} else
{return and__6746__auto__;
}
})()))
{cljs.core.reset_BANG_.call(null,buffer,null);
} else
{{
var G__8596 = msg_8593__$1.slice(pos_8595);
msg_8593__$1 = G__8596;
continue;
}
}
}catch (e8576){if((e8576 instanceof global.Error))
{var e_8597 = e8576;cljs.core.reset_BANG_.call(null,failed_recently_QMARK_,true);
cljs.core.reset_BANG_.call(null,buffer,msg_8593__$1);
setTimeout(((function (msg_8593__$1,e_8597){
return (function (){cljs.core.reset_BANG_.call(null,failed_recently_QMARK_,false);
return decode.call(null,client,failed_recently_QMARK_);
});})(msg_8593__$1,e_8597))
,50);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e8576;
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
lt.plugins.clojure.nrepl.maybe_decode = (function maybe_decode(client,failed_recently_QMARK_,data){cljs.core.swap_BANG_.call(null,new cljs.core.Keyword(null,"buffer","buffer",3930752946).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,client)),(function (p1__8577_SHARP_){if(cljs.core.truth_(p1__8577_SHARP_))
{return lt.plugins.clojure.nrepl.Buffer.Buffer.concat([p1__8577_SHARP_,data]);
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
}catch (e8579){var e_8598 = e8579;lt.objs.console.error.call(null,e_8598);
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
lt.plugins.clojure.nrepl.connect_to = (function connect_to(host,port,client){var socket = lt.plugins.clojure.nrepl.net.connect(port,host);var failed_recently_QMARK_ = cljs.core.atom.call(null,false);socket.on("connect",(function (){if(cljs.core.truth_(cljs.core.deref.call(null,client)))
{return lt.object.raise.call(null,client,new cljs.core.Keyword("lt.plugins.clojure.nrepl","connect","lt.plugins.clojure.nrepl/connect",2771734158));
} else
{return null;
}
}));
socket.on("error",(function (){if(cljs.core.truth_(cljs.core.deref.call(null,client)))
{return lt.object.raise.call(null,client,new cljs.core.Keyword("lt.plugins.clojure.nrepl","connect-fail","lt.plugins.clojure.nrepl/connect-fail",1808743639));
} else
{return null;
}
}));
socket.on("data",(function (p1__8580_SHARP_){if(cljs.core.truth_(cljs.core.deref.call(null,client)))
{return lt.plugins.clojure.nrepl.maybe_decode.call(null,client,failed_recently_QMARK_,p1__8580_SHARP_);
} else
{return null;
}
}));
socket.on("close",(function (){if(cljs.core.truth_(cljs.core.deref.call(null,client)))
{return lt.object.raise.call(null,client,new cljs.core.Keyword(null,"close!","close!",3951350939));
} else
{return null;
}
}));
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
lt.plugins.clojure.nrepl.__BEH__nrepl_send_BANG_ = (function __BEH__nrepl_send_BANG_(this$,msg){return lt.plugins.clojure.nrepl.send.call(null,this$,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"op","op",1013907795),new cljs.core.Keyword(null,"command","command",1964298941).cljs$core$IFn$_invoke$arity$1(msg),new cljs.core.Keyword(null,"id","id",1013907597),(function (){var or__6758__auto__ = new cljs.core.Keyword(null,"cb","cb",1013907409).cljs$core$IFn$_invoke$arity$1(msg);if(cljs.core.truth_(or__6758__auto__))
{return or__6758__auto__;
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
lt.plugins.clojure.nrepl.__BEH__nrepl_message = (function __BEH__nrepl_message(this$,msg){var op = new cljs.core.Keyword(null,"op","op",1013907795).cljs$core$IFn$_invoke$arity$1(msg);var encoding = new cljs.core.Keyword(null,"encoding","encoding",2725126341).cljs$core$IFn$_invoke$arity$1(msg);var info = (cljs.core.truth_(new cljs.core.Keyword(null,"data","data",1016980252).cljs$core$IFn$_invoke$arity$1(msg))?(function (){var G__8582 = encoding;if(cljs.core._EQ_.call(null,"json",G__8582))
{return JSON.parse(new cljs.core.Keyword(null,"data","data",1016980252).cljs$core$IFn$_invoke$arity$1(msg));
} else
{if(cljs.core._EQ_.call(null,"edn",G__8582))
{return cljs.reader.read_string.call(null,new cljs.core.Keyword(null,"data","data",1016980252).cljs$core$IFn$_invoke$arity$1(msg));
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(encoding)].join('')));
} else
{return null;
}
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
lt.plugins.clojure.nrepl.send = (function send(client,msg){var session = new cljs.core.Keyword(null,"session","session",2998892040).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,client));var msg__$1 = cljs.core.merge.call(null,(cljs.core.truth_(session)?new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"session","session",2998892040),session], null):null),msg);return lt.plugins.clojure.nrepl.send_STAR_.call(null,client,msg__$1,lt.plugins.clojure.nrepl.cb);
});
}
if(!lt.util.load.provided_QMARK_('lt.plugins.clojure')) {
goog.provide('lt.plugins.clojure');
goog.require('cljs.core');
goog.require('lt.util.cljs');
goog.require('lt.objs.app');
goog.require('lt.objs.plugins');
goog.require('lt.objs.files');
goog.require('lt.objs.connector');
goog.require('lt.objs.statusbar');
goog.require('lt.util.js');
goog.require('lt.util.dom');
goog.require('lt.objs.context');
goog.require('lt.objs.platform');
goog.require('lt.objs.statusbar');
goog.require('lt.objs.popup');
goog.require('lt.objs.dialogs');
goog.require('lt.objs.popup');
goog.require('lt.plugins.auto_complete');
goog.require('lt.objs.context');
goog.require('lt.objs.notifos');
goog.require('lt.objs.proc');
goog.require('lt.objs.notifos');
goog.require('lt.util.dom');
goog.require('clojure.string');
goog.require('lt.util.cljs');
goog.require('lt.objs.command');
goog.require('lt.objs.platform');
goog.require('lt.objs.files');
goog.require('lt.objs.clients.tcp');
goog.require('lt.objs.connector');
goog.require('lt.objs.sidebar.clients');
goog.require('lt.objs.plugins');
goog.require('lt.plugins.auto_complete');
goog.require('lt.plugins.watches');
goog.require('lt.objs.app');
goog.require('lt.objs.eval');
goog.require('lt.objs.clients');
goog.require('lt.objs.clients.tcp');
goog.require('lt.util.load');
goog.require('clojure.string');
goog.require('lt.plugins.watches');
goog.require('lt.objs.deploy');
goog.require('lt.objs.editor');
goog.require('lt.object');
goog.require('lt.object');
goog.require('lt.objs.dialogs');
goog.require('lt.util.load');
goog.require('lt.objs.console');
goog.require('lt.objs.proc');
goog.require('lt.objs.console');
goog.require('lt.util.js');
goog.require('lt.objs.eval');
goog.require('lt.objs.clients');
goog.require('lt.objs.sidebar.clients');
goog.require('lt.objs.command');
goog.require('lt.objs.deploy');
goog.require('lt.objs.editor');
lt.plugins.clojure.shell = lt.util.load.node_module.call(null,"shelljs");
lt.plugins.clojure.cur_path = lt.plugins.clojure.shell.pwd();
lt.plugins.clojure.local_project_clj = lt.objs.files.join.call(null,lt.objs.plugins._STAR_plugin_dir_STAR_,"runner/resources/project.clj");
lt.plugins.clojure.jar_path = lt.objs.files.join.call(null,lt.objs.plugins._STAR_plugin_dir_STAR_,"runner/target/lein-light-standalone.jar");
lt.plugins.clojure.binary_search = (function binary_search(arr,loc){var line = new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(loc);var f = 0;var l = (arr.length - 1);while(true){
var i = (((f + l) / 2) | 0);var cur = (arr[i]);if(((cur.line >= line)) && ((cur.endLine <= line)))
{return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"line","line",1017226086),cur.line,new cljs.core.Keyword(null,"end-line","end-line",2693041432),cur.endLine,new cljs.core.Keyword(null,"col","col",1014002930),cur.col,new cljs.core.Keyword(null,"end-col","end-col",3700460800),cur.endCol], null);
} else
{if(cljs.core._EQ_.call(null,f,i,l))
{return null;
} else
{if((line > cur.endLine))
{{
var G__8700 = (i + 1);
var G__8701 = l;
f = G__8700;
l = G__8701;
continue;
}
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{{
var G__8702 = f;
var G__8703 = i;
f = G__8702;
l = G__8703;
continue;
}
} else
{return null;
}
}
}
}
break;
}
});
lt.plugins.clojure.find_form = (function find_form(str,loc){var parsed = lt.plugins.clojure.parser.parse(str);return lt.plugins.clojure.binary_search.call(null,parsed,loc);
});
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
lt.plugins.clojure.cljs_result_format = (function cljs_result_format(n){if(cljs.core.fn_QMARK_.call(null,n))
{return [cljs.core.str("(fn "),cljs.core.str(n.name),cljs.core.str(" ..)")].join('');
} else
{if((n == null))
{return "nil";
} else
{if(cljs.core._EQ_.call(null,cljs.core.pr_str.call(null,n),"#<[object Object]>"))
{return lt.objs.console.inspect.call(null,n);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{return cljs.core.pr_str.call(null,n);
} else
{return null;
}
}
}
}
});
lt.plugins.clojure.try_connect = (function try_connect(p__8599){var map__8602 = p__8599;var map__8602__$1 = ((cljs.core.seq_QMARK_.call(null,map__8602))?cljs.core.apply.call(null,cljs.core.hash_map,map__8602):map__8602);var info = cljs.core.get.call(null,map__8602__$1,new cljs.core.Keyword(null,"info","info",1017141280));var path = new cljs.core.Keyword(null,"path","path",1017337751).cljs$core$IFn$_invoke$arity$1(info);var map__8603 = (cljs.core.truth_(path)?lt.plugins.clojure.find_project.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"path","path",1017337751),path], null)):null);var map__8603__$1 = ((cljs.core.seq_QMARK_.call(null,map__8603))?cljs.core.apply.call(null,cljs.core.hash_map,map__8603):map__8603);var project_path = cljs.core.get.call(null,map__8603__$1,new cljs.core.Keyword(null,"project-path","project-path",1907176907));if(cljs.core.truth_(project_path))
{return lt.plugins.clojure.check_all.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"path","path",1017337751),path,new cljs.core.Keyword(null,"client","client",3951159101),lt.objs.clients.client_BANG_.call(null,new cljs.core.Keyword(null,"nrepl.client","nrepl.client",4747318638))], null));
} else
{var or__6758__auto__ = lt.objs.clients.by_name.call(null,lt.plugins.clojure.local_name);if(cljs.core.truth_(or__6758__auto__))
{return or__6758__auto__;
} else
{return lt.plugins.clojure.run_local_server.call(null,lt.objs.clients.client_BANG_.call(null,new cljs.core.Keyword(null,"nrepl.client","nrepl.client",4747318638)));
}
}
});
lt.plugins.clojure.__BEH__on_eval = (function __BEH__on_eval(editor){return lt.object.raise.call(null,lt.plugins.clojure.clj_lang,new cljs.core.Keyword(null,"eval!","eval!",1110791799),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"origin","origin",4300251800),editor,new cljs.core.Keyword(null,"info","info",1017141280),cljs.core.assoc.call(null,cljs.core.deref.call(null,editor).call(null,new cljs.core.Keyword(null,"info","info",1017141280)),new cljs.core.Keyword(null,"print-length","print-length",3960797560),lt.object.raise_reduce.call(null,editor,new cljs.core.Keyword(null,"clojure.print-length+","clojure.print-length+",4366367949),null),new cljs.core.Keyword(null,"code","code",1016963423),lt.plugins.watches.watched_range.call(null,editor,null,null,(cljs.core.truth_(lt.object.has_tag_QMARK_.call(null,editor,new cljs.core.Keyword(null,"editor.cljs","editor.cljs",4270230213)))?lt.plugins.clojure.cljs_watch:lt.plugins.clojure.clj_watch)))], null));
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure","on-eval","lt.plugins.clojure/on-eval",1190254328),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.__BEH__on_eval,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"eval","eval",1017029646),null], null), null));
lt.plugins.clojure.__BEH__on_eval__DOT__one = (function __BEH__on_eval__DOT__one(editor){var code = lt.plugins.watches.watched_range.call(null,editor,null,null,(cljs.core.truth_(lt.object.has_tag_QMARK_.call(null,editor,new cljs.core.Keyword(null,"editor.cljs","editor.cljs",4270230213)))?lt.plugins.clojure.cljs_watch:lt.plugins.clojure.clj_watch));var pos = lt.objs.editor.__GT_cursor.call(null,editor);var info = new cljs.core.Keyword(null,"info","info",1017141280).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,editor));var info__$1 = (cljs.core.truth_(lt.objs.editor.selection_QMARK_.call(null,editor))?cljs.core.assoc.call(null,info,new cljs.core.Keyword(null,"code","code",1016963423),lt.objs.editor.selection.call(null,editor),new cljs.core.Keyword(null,"meta","meta",1017252215),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"start","start",1123661780),new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(lt.objs.editor.__GT_cursor.call(null,editor,"start")),new cljs.core.Keyword(null,"end","end",1014004813),new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(lt.objs.editor.__GT_cursor.call(null,editor,"end"))], null)):cljs.core.assoc.call(null,info,new cljs.core.Keyword(null,"pos","pos",1014015430),pos,new cljs.core.Keyword(null,"code","code",1016963423),code));var info__$2 = cljs.core.assoc.call(null,info__$1,new cljs.core.Keyword(null,"print-length","print-length",3960797560),lt.object.raise_reduce.call(null,editor,new cljs.core.Keyword(null,"clojure.print-length+","clojure.print-length+",4366367949),null));return lt.object.raise.call(null,lt.plugins.clojure.clj_lang,new cljs.core.Keyword(null,"eval!","eval!",1110791799),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"origin","origin",4300251800),editor,new cljs.core.Keyword(null,"info","info",1017141280),info__$2], null));
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure","on-eval.one","lt.plugins.clojure/on-eval.one",1491055984),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.__BEH__on_eval__DOT__one,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"eval.one","eval.one",1173589382),null], null), null));
lt.plugins.clojure.fill_placeholders = (function fill_placeholders(editor,exp){return clojure.string.replace.call(null,clojure.string.replace.call(null,exp,"__SELECTION*__",cljs.core.pr_str.call(null,lt.objs.editor.selection.call(null,editor))),"__SELECTION__",lt.objs.editor.selection.call(null,editor));
});
lt.plugins.clojure.__BEH__on_eval__DOT__custom = (function __BEH__on_eval__DOT__custom(editor,exp,opts){var code = lt.plugins.clojure.fill_placeholders.call(null,editor,exp);var pos = lt.objs.editor.__GT_cursor.call(null,editor);var info = new cljs.core.Keyword(null,"info","info",1017141280).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,editor));var info__$1 = cljs.core.assoc.call(null,info,new cljs.core.Keyword(null,"code","code",1016963423),code,new cljs.core.Keyword(null,"ns","ns",1013907767),(function (){var or__6758__auto__ = new cljs.core.Keyword(null,"ns","ns",1013907767).cljs$core$IFn$_invoke$arity$1(opts);if(cljs.core.truth_(or__6758__auto__))
{return or__6758__auto__;
} else
{return new cljs.core.Keyword(null,"ns","ns",1013907767).cljs$core$IFn$_invoke$arity$1(info);
}
})(),new cljs.core.Keyword(null,"meta","meta",1017252215),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"start","start",1123661780),new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(lt.objs.editor.__GT_cursor.call(null,editor,"start")),new cljs.core.Keyword(null,"end","end",1014004813),new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(lt.objs.editor.__GT_cursor.call(null,editor,"end")),new cljs.core.Keyword(null,"verbatim","verbatim",3307884968),new cljs.core.Keyword(null,"verbatim","verbatim",3307884968).cljs$core$IFn$_invoke$arity$1(opts),new cljs.core.Keyword(null,"result-type","result-type",4725630556),(function (){var or__6758__auto__ = new cljs.core.Keyword(null,"result-type","result-type",4725630556).cljs$core$IFn$_invoke$arity$1(opts);if(cljs.core.truth_(or__6758__auto__))
{return or__6758__auto__;
} else
{return new cljs.core.Keyword(null,"inline","inline",4124874251);
}
})(),new cljs.core.Keyword(null,"handler","handler",1706707644),(function (){var temp__4090__auto__ = new cljs.core.Keyword(null,"handler","handler",1706707644).cljs$core$IFn$_invoke$arity$1(opts);if(cljs.core.truth_(temp__4090__auto__))
{var handler = temp__4090__auto__;return lt.object.__GT_id.call(null,handler);
} else
{return null;
}
})()], null));var info__$2 = cljs.core.assoc.call(null,info__$1,new cljs.core.Keyword(null,"print-length","print-length",3960797560),lt.object.raise_reduce.call(null,editor,new cljs.core.Keyword(null,"clojure.print-length+","clojure.print-length+",4366367949),null));return lt.object.raise.call(null,lt.plugins.clojure.clj_lang,new cljs.core.Keyword(null,"eval!","eval!",1110791799),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"origin","origin",4300251800),editor,new cljs.core.Keyword(null,"info","info",1017141280),info__$2], null));
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure","on-eval.custom","lt.plugins.clojure/on-eval.custom",2808954147),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.__BEH__on_eval__DOT__custom,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"eval.custom","eval.custom",3328560245),null], null), null));
lt.plugins.clojure.__BEH__on_code = (function __BEH__on_code(this$,result){return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"exec.cljs!","exec.cljs!",3800101572),result);
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure","on-code","lt.plugins.clojure/on-code",1190320137),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.__BEH__on_code,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"editor.eval.cljs.code","editor.eval.cljs.code",866569770),null], null), null));
lt.plugins.clojure.__BEH__exec__DOT__cljs_BANG_ = (function __BEH__exec__DOT__cljs_BANG_(this$,res){var client = new cljs.core.Keyword(null,"exec","exec",1017031683).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"client","client",3951159101).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)));var path = new cljs.core.Keyword(null,"path","path",1017337751).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"info","info",1017141280).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)));var res__$1 = cljs.core.update_in.call(null,res,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"results","results",2111450984)], null),((function (client,path){
return (function (p1__8604_SHARP_){var iter__7469__auto__ = ((function (client,path){
return (function iter__8609(s__8610){return (new cljs.core.LazySeq(null,((function (client,path){
return (function (){var s__8610__$1 = s__8610;while(true){
var temp__4092__auto__ = cljs.core.seq.call(null,s__8610__$1);if(temp__4092__auto__)
{var s__8610__$2 = temp__4092__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,s__8610__$2))
{var c__7467__auto__ = cljs.core.chunk_first.call(null,s__8610__$2);var size__7468__auto__ = cljs.core.count.call(null,c__7467__auto__);var b__8612 = cljs.core.chunk_buffer.call(null,size__7468__auto__);if((function (){var i__8611 = 0;while(true){
if((i__8611 < size__7468__auto__))
{var r = cljs.core._nth.call(null,c__7467__auto__,i__8611);cljs.core.chunk_append.call(null,b__8612,cljs.core.assoc.call(null,r,new cljs.core.Keyword(null,"code","code",1016963423),lt.objs.eval.append_source_file.call(null,lt.objs.eval.pad.call(null,new cljs.core.Keyword(null,"code","code",1016963423).cljs$core$IFn$_invoke$arity$1(r),(new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(r)) - 1)),path),new cljs.core.Keyword(null,"meta","meta",1017252215),cljs.core.merge.call(null,new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(res),new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(r))));
{
var G__8704 = (i__8611 + 1);
i__8611 = G__8704;
continue;
}
} else
{return true;
}
break;
}
})())
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__8612),iter__8609.call(null,cljs.core.chunk_rest.call(null,s__8610__$2)));
} else
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__8612),null);
}
} else
{var r = cljs.core.first.call(null,s__8610__$2);return cljs.core.cons.call(null,cljs.core.assoc.call(null,r,new cljs.core.Keyword(null,"code","code",1016963423),lt.objs.eval.append_source_file.call(null,lt.objs.eval.pad.call(null,new cljs.core.Keyword(null,"code","code",1016963423).cljs$core$IFn$_invoke$arity$1(r),(new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(r)) - 1)),path),new cljs.core.Keyword(null,"meta","meta",1017252215),cljs.core.merge.call(null,new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(res),new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(r))),iter__8609.call(null,cljs.core.rest.call(null,s__8610__$2)));
}
} else
{return null;
}
break;
}
});})(client,path))
,null,null));
});})(client,path))
;return iter__7469__auto__.call(null,p1__8604_SHARP_);
});})(client,path))
);return lt.objs.clients.send.call(null,lt.objs.eval.get_client_BANG_.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"editor.eval.cljs.exec","editor.eval.cljs.exec",866638030),new cljs.core.Keyword(null,"info","info",1017141280),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"type","type",1017479852),"cljs"], null),new cljs.core.Keyword(null,"key","key",1014010321),new cljs.core.Keyword(null,"exec","exec",1017031683),new cljs.core.Keyword(null,"origin","origin",4300251800),this$], null)),new cljs.core.Keyword(null,"editor.eval.cljs.exec","editor.eval.cljs.exec",866638030),res__$1,new cljs.core.Keyword(null,"only","only",1017320222),this$);
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure","exec.cljs!","lt.plugins.clojure/exec.cljs!",1322475104),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.__BEH__exec__DOT__cljs_BANG_,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"exec.cljs!","exec.cljs!",3800101572),null], null), null));
lt.plugins.clojure.mime__GT_type = new cljs.core.PersistentArrayMap(null, 2, ["text/x-clojure","clj","text/x-clojurescript","cljs"], null);
lt.plugins.clojure.__BEH__eval_BANG_ = (function __BEH__eval_BANG_(this$,event){var map__8614 = event;var map__8614__$1 = ((cljs.core.seq_QMARK_.call(null,map__8614))?cljs.core.apply.call(null,cljs.core.hash_map,map__8614):map__8614);var origin = cljs.core.get.call(null,map__8614__$1,new cljs.core.Keyword(null,"origin","origin",4300251800));var info = cljs.core.get.call(null,map__8614__$1,new cljs.core.Keyword(null,"info","info",1017141280));var command = lt.util.cljs.__GT_dottedkw.call(null,new cljs.core.Keyword(null,"editor.eval","editor.eval",4270299119),lt.plugins.clojure.mime__GT_type.call(null,new cljs.core.Keyword(null,"mime","mime",1017255846).cljs$core$IFn$_invoke$arity$1(info)));var client = new cljs.core.Keyword(null,"default","default",2558708147).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"client","client",3951159101).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,origin)));lt.objs.notifos.working.call(null);
return lt.objs.clients.send.call(null,lt.objs.eval.get_client_BANG_.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",1964298941),command,new cljs.core.Keyword(null,"info","info",1017141280),info,new cljs.core.Keyword(null,"origin","origin",4300251800),origin,new cljs.core.Keyword(null,"create","create",3956577390),lt.plugins.clojure.try_connect], null)),command,info,new cljs.core.Keyword(null,"only","only",1017320222),origin);
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure","eval!","lt.plugins.clojure/eval!",1863154227),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.__BEH__eval_BANG_,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"eval!","eval!",1110791799),null], null), null));
lt.plugins.clojure.__BEH__build_BANG_ = (function __BEH__build_BANG_(this$,event){var map__8616 = event;var map__8616__$1 = ((cljs.core.seq_QMARK_.call(null,map__8616))?cljs.core.apply.call(null,cljs.core.hash_map,map__8616):map__8616);var origin = cljs.core.get.call(null,map__8616__$1,new cljs.core.Keyword(null,"origin","origin",4300251800));var info = cljs.core.get.call(null,map__8616__$1,new cljs.core.Keyword(null,"info","info",1017141280));var command = lt.util.cljs.__GT_dottedkw.call(null,lt.plugins.clojure.mime__GT_type.call(null,new cljs.core.Keyword(null,"mime","mime",1017255846).cljs$core$IFn$_invoke$arity$1(info)),"compile");lt.objs.notifos.working.call(null,"Starting build");
return lt.objs.clients.send.call(null,lt.objs.eval.get_client_BANG_.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",1964298941),command,new cljs.core.Keyword(null,"info","info",1017141280),info,new cljs.core.Keyword(null,"origin","origin",4300251800),origin,new cljs.core.Keyword(null,"create","create",3956577390),lt.plugins.clojure.try_connect], null)),command,info,new cljs.core.Keyword(null,"only","only",1017320222),origin);
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure","build!","lt.plugins.clojure/build!",1190684225),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.__BEH__build_BANG_,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"build!","build!",3930847973),null], null), null));
lt.plugins.clojure.__BEH__build_cljs_plugin = (function __BEH__build_cljs_plugin(this$,opts){var to_compile = lt.objs.files.filter_walk.call(null,(function (p1__8617_SHARP_){return cljs.core._EQ_.call(null,lt.objs.files.ext.call(null,p1__8617_SHARP_),"cljs");
}),lt.objs.files.join.call(null,new cljs.core.Keyword("lt.objs.plugins","plugin-path","lt.objs.plugins/plugin-path",2063828362).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)),"src"));return lt.object.raise.call(null,lt.plugins.clojure.clj_lang,new cljs.core.Keyword(null,"build!","build!",3930847973),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"info","info",1017141280),new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"files","files",1111338473),to_compile,new cljs.core.Keyword(null,"mime","mime",1017255846),new cljs.core.Keyword(null,"mime","mime",1017255846).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"info","info",1017141280).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$))),new cljs.core.Keyword(null,"dir","dir",1014003711),new cljs.core.Keyword("lt.objs.plugins","plugin-path","lt.objs.plugins/plugin-path",2063828362).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)),new cljs.core.Keyword(null,"path","path",1017337751),lt.objs.files.join.call(null,new cljs.core.Keyword("lt.objs.plugins","plugin-path","lt.objs.plugins/plugin-path",2063828362).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)),"plugin.edn"),new cljs.core.Keyword(null,"ignore","ignore",4118475076),new cljs.core.PersistentVector(null, 16, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"goog","goog",-1637352839,null),new cljs.core.Symbol(null,"goog.array","goog.array",-658519708,null),new cljs.core.Symbol(null,"lt.object","lt.object",-2122453986,null),new cljs.core.Symbol(null,"crate.core","crate.core",550297763,null),new cljs.core.Symbol(null,"crate.util","crate.util",550838534,null),new cljs.core.Symbol(null,"lt.util.load","lt.util.load",2092978213,null),new cljs.core.Symbol(null,"lt.util.cljs","lt.util.cljs",2092707505,null),new cljs.core.Symbol(null,"lt.util.dom","lt.util.dom",-273177419,null),new cljs.core.Symbol(null,"lt.util.js","lt.util.js",2144354824,null),new cljs.core.Symbol(null,"fetch.core","fetch.core",-1380286452,null),new cljs.core.Symbol(null,"fetch.util","fetch.util",-1379745681,null),new cljs.core.Symbol(null,"cljs.core","cljs.core",1979061844,null),new cljs.core.Symbol(null,"cljs.reader","cljs.reader",-1715113864,null),new cljs.core.Symbol(null,"clojure.string","clojure.string",-2028944364,null),new cljs.core.Symbol(null,"clojure.set","clojure.set",-2081128431,null),new cljs.core.Symbol(null,"goog.string","goog.string",-745757000,null)], null),new cljs.core.Keyword(null,"merge?","merge?",4231255673),true], null),new cljs.core.Keyword(null,"origin","origin",4300251800),this$], null));
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure","build-cljs-plugin","lt.plugins.clojure/build-cljs-plugin",4539349021),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.__BEH__build_cljs_plugin,new cljs.core.Keyword(null,"desc","desc",1016984067),"Plugin: build ClojureScript plugin",new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"build","build",1107999200),null], null), null));
lt.plugins.clojure.__BEH__plugin_compile_results = (function __BEH__plugin_compile_results(this$,res){var plugin_name = clojure.string.lower_case.call(null,new cljs.core.Keyword(null,"name","name",1017277949).cljs$core$IFn$_invoke$arity$1(lt.objs.plugins.plugin_info.call(null,new cljs.core.Keyword("lt.objs.plugins","plugin-path","lt.objs.plugins/plugin-path",2063828362).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)))));var final_path = lt.objs.files.join.call(null,new cljs.core.Keyword("lt.objs.plugins","plugin-path","lt.objs.plugins/plugin-path",2063828362).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)),[cljs.core.str(plugin_name),cljs.core.str("_compiled.js")].join(''));var plugin_map_name = [cljs.core.str(plugin_name),cljs.core.str("_compiled.js.map")].join('');var sm_path = lt.objs.files.join.call(null,new cljs.core.Keyword("lt.objs.plugins","plugin-path","lt.objs.plugins/plugin-path",2063828362).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)),plugin_map_name);lt.objs.notifos.done_working.call(null,[cljs.core.str("Compiled plugin to "),cljs.core.str(final_path)].join(''));
lt.objs.files.save.call(null,final_path,[cljs.core.str(new cljs.core.Keyword(null,"js","js",1013907643).cljs$core$IFn$_invoke$arity$1(res)),cljs.core.str("\n//# sourceMappingURL="),cljs.core.str(plugin_map_name)].join(''));
return lt.objs.files.save.call(null,sm_path,new cljs.core.Keyword(null,"source-map","source-map",4196266012).cljs$core$IFn$_invoke$arity$1(res));
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure","plugin-compile-results","lt.plugins.clojure/plugin-compile-results",4522483440),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.__BEH__plugin_compile_results,new cljs.core.Keyword(null,"desc","desc",1016984067),"Plugin: output compile results",new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"cljs.compile.results","cljs.compile.results",3808629809),null], null), null));
lt.plugins.clojure.__BEH__on_result_set_ns = (function __BEH__on_result_set_ns(obj,res){if(cljs.core.truth_((function (){var and__6746__auto__ = new cljs.core.Keyword(null,"ns","ns",1013907767).cljs$core$IFn$_invoke$arity$1(res);if(cljs.core.truth_(and__6746__auto__))
{return cljs.core.not_EQ_.call(null,new cljs.core.Keyword(null,"ns","ns",1013907767).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"info","info",1017141280).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,obj))),new cljs.core.Keyword(null,"ns","ns",1013907767).cljs$core$IFn$_invoke$arity$1(res));
} else
{return and__6746__auto__;
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
var type = (function (){var or__6758__auto__ = new cljs.core.Keyword(null,"result-type","result-type",4725630556).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(res));if(cljs.core.truth_(or__6758__auto__))
{return or__6758__auto__;
} else
{return new cljs.core.Keyword(null,"inline","inline",4124874251);
}
})();var ev = lt.util.cljs.__GT_dottedkw.call(null,new cljs.core.Keyword(null,"editor.eval.cljs.result","editor.eval.cljs.result",1580065178),type);return lt.object.raise.call(null,obj,ev,res);
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure","cljs-result","lt.plugins.clojure/cljs-result",779436518),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.__BEH__cljs_result,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"editor.eval.cljs.result","editor.eval.cljs.result",1580065178),null], null), null));
lt.plugins.clojure.__BEH__cljs_result__DOT__replace = (function __BEH__cljs_result__DOT__replace(obj,res){var temp__4090__auto__ = (function (){var or__6758__auto__ = new cljs.core.Keyword(null,"stack","stack",1123661306).cljs$core$IFn$_invoke$arity$1(res);if(cljs.core.truth_(or__6758__auto__))
{return or__6758__auto__;
} else
{return new cljs.core.Keyword(null,"ex","ex",1013907493).cljs$core$IFn$_invoke$arity$1(res);
}
})();if(cljs.core.truth_(temp__4090__auto__))
{var err = temp__4090__auto__;return lt.objs.notifos.set_msg_BANG_.call(null,err,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",1108647146),"error"], null));
} else
{return lt.objs.editor.replace_selection.call(null,obj,lt.plugins.clojure.unescape_unicode.call(null,(function (){var or__6758__auto__ = new cljs.core.Keyword(null,"result","result",4374444943).cljs$core$IFn$_invoke$arity$1(res);if(cljs.core.truth_(or__6758__auto__))
{return or__6758__auto__;
} else
{return "";
}
})()));
}
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure","cljs-result.replace","lt.plugins.clojure/cljs-result.replace",2659047564),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.__BEH__cljs_result__DOT__replace,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"editor.eval.cljs.result.replace","editor.eval.cljs.result.replace",1975778400),null], null), null));
lt.plugins.clojure.__BEH__cljs_result__DOT__statusbar = (function __BEH__cljs_result__DOT__statusbar(obj,res){var temp__4090__auto__ = (function (){var or__6758__auto__ = new cljs.core.Keyword(null,"stack","stack",1123661306).cljs$core$IFn$_invoke$arity$1(res);if(cljs.core.truth_(or__6758__auto__))
{return or__6758__auto__;
} else
{return new cljs.core.Keyword(null,"ex","ex",1013907493).cljs$core$IFn$_invoke$arity$1(res);
}
})();if(cljs.core.truth_(temp__4090__auto__))
{var err = temp__4090__auto__;return lt.objs.notifos.set_msg_BANG_.call(null,err,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",1108647146),"error"], null));
} else
{return lt.objs.notifos.set_msg_BANG_.call(null,lt.plugins.clojure.unescape_unicode.call(null,(function (){var or__6758__auto__ = new cljs.core.Keyword(null,"result","result",4374444943).cljs$core$IFn$_invoke$arity$1(res);if(cljs.core.truth_(or__6758__auto__))
{return or__6758__auto__;
} else
{return "";
}
})()),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",1108647146),"result"], null));
}
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure","cljs-result.statusbar","lt.plugins.clojure/cljs-result.statusbar",1141718617),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.__BEH__cljs_result__DOT__statusbar,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"editor.eval.cljs.result.statusbar","editor.eval.cljs.result.statusbar",4637192717),null], null), null));
lt.plugins.clojure.__BEH__cljs_result__DOT__inline = (function __BEH__cljs_result__DOT__inline(obj,res){var meta = new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(res);var loc = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",1017226086),(new cljs.core.Keyword(null,"end-line","end-line",2693041432).cljs$core$IFn$_invoke$arity$1(meta) - 1),new cljs.core.Keyword(null,"ch","ch",1013907415),new cljs.core.Keyword(null,"end-column","end-column",3799845882).cljs$core$IFn$_invoke$arity$1(meta),new cljs.core.Keyword(null,"start-line","start-line",3689311729),(new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(meta) - 1)], null);var temp__4090__auto__ = (function (){var or__6758__auto__ = new cljs.core.Keyword(null,"stack","stack",1123661306).cljs$core$IFn$_invoke$arity$1(res);if(cljs.core.truth_(or__6758__auto__))
{return or__6758__auto__;
} else
{return new cljs.core.Keyword(null,"ex","ex",1013907493).cljs$core$IFn$_invoke$arity$1(res);
}
})();if(cljs.core.truth_(temp__4090__auto__))
{var err = temp__4090__auto__;return lt.object.raise.call(null,obj,new cljs.core.Keyword(null,"editor.eval.cljs.exception","editor.eval.cljs.exception",4479049174),res,new cljs.core.Keyword(null,"passed","passed",4313490402));
} else
{return lt.object.raise.call(null,obj,new cljs.core.Keyword(null,"editor.result","editor.result",4030217008),lt.plugins.clojure.unescape_unicode.call(null,(function (){var or__6758__auto__ = new cljs.core.Keyword(null,"result","result",4374444943).cljs$core$IFn$_invoke$arity$1(res);if(cljs.core.truth_(or__6758__auto__))
{return or__6758__auto__;
} else
{return "";
}
})()),loc);
}
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure","cljs-result.inline","lt.plugins.clojure/cljs-result.inline",3718133053),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.__BEH__cljs_result__DOT__inline,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"editor.eval.cljs.result.inline","editor.eval.cljs.result.inline",4674785425),null], null), null));
lt.plugins.clojure.__BEH__cljs_result__DOT__inline_at_cursor = (function __BEH__cljs_result__DOT__inline_at_cursor(obj,res){var meta = new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(res);var loc = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"line","line",1017226086),new cljs.core.Keyword(null,"start","start",1123661780).cljs$core$IFn$_invoke$arity$1(meta),new cljs.core.Keyword(null,"start-line","start-line",3689311729),new cljs.core.Keyword(null,"start","start",1123661780).cljs$core$IFn$_invoke$arity$1(meta)], null);var temp__4090__auto__ = (function (){var or__6758__auto__ = new cljs.core.Keyword(null,"stack","stack",1123661306).cljs$core$IFn$_invoke$arity$1(res);if(cljs.core.truth_(or__6758__auto__))
{return or__6758__auto__;
} else
{return new cljs.core.Keyword(null,"ex","ex",1013907493).cljs$core$IFn$_invoke$arity$1(res);
}
})();if(cljs.core.truth_(temp__4090__auto__))
{var err = temp__4090__auto__;return lt.object.raise.call(null,obj,new cljs.core.Keyword(null,"editor.eval.cljs.exception","editor.eval.cljs.exception",4479049174),res,new cljs.core.Keyword(null,"passed","passed",4313490402));
} else
{return lt.object.raise.call(null,obj,new cljs.core.Keyword(null,"editor.result","editor.result",4030217008),lt.plugins.clojure.unescape_unicode.call(null,(function (){var or__6758__auto__ = new cljs.core.Keyword(null,"result","result",4374444943).cljs$core$IFn$_invoke$arity$1(res);if(cljs.core.truth_(or__6758__auto__))
{return or__6758__auto__;
} else
{return "";
}
})()),loc);
}
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure","cljs-result.inline-at-cursor","lt.plugins.clojure/cljs-result.inline-at-cursor",3375816544),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.__BEH__cljs_result__DOT__inline_at_cursor,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"editor.eval.cljs.result.inline-at-cursor","editor.eval.cljs.result.inline-at-cursor",1541585524),null], null), null));
lt.plugins.clojure.__BEH__cljs_result__DOT__return = (function __BEH__cljs_result__DOT__return(obj,res){var meta = new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(res);var handler = lt.object.by_id.call(null,new cljs.core.Keyword(null,"handler","handler",1706707644).cljs$core$IFn$_invoke$arity$1(meta));var loc = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"line","line",1017226086),new cljs.core.Keyword(null,"start","start",1123661780).cljs$core$IFn$_invoke$arity$1(meta),new cljs.core.Keyword(null,"start-line","start-line",3689311729),new cljs.core.Keyword(null,"start","start",1123661780).cljs$core$IFn$_invoke$arity$1(meta)], null);var temp__4090__auto__ = (function (){var or__6758__auto__ = new cljs.core.Keyword(null,"stack","stack",1123661306).cljs$core$IFn$_invoke$arity$1(res);if(cljs.core.truth_(or__6758__auto__))
{return or__6758__auto__;
} else
{return new cljs.core.Keyword(null,"ex","ex",1013907493).cljs$core$IFn$_invoke$arity$1(res);
}
})();if(cljs.core.truth_(temp__4090__auto__))
{var err = temp__4090__auto__;return lt.object.raise.call(null,obj,new cljs.core.Keyword(null,"editor.eval.cljs.exception","editor.eval.cljs.exception",4479049174),res,new cljs.core.Keyword(null,"passed","passed",4313490402));
} else
{return lt.object.raise.call(null,handler,new cljs.core.Keyword(null,"return","return",4374474914),new cljs.core.Keyword(null,"result","result",4374444943).cljs$core$IFn$_invoke$arity$1(res));
}
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure","cljs-result.return","lt.plugins.clojure/cljs-result.return",3430717492),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.__BEH__cljs_result__DOT__return,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"editor.eval.cljs.result.return","editor.eval.cljs.result.return",629418792),null], null), null));
lt.plugins.clojure.__BEH__clj_result = (function __BEH__clj_result(obj,res){lt.objs.notifos.done_working.call(null);
var type = (function (){var or__6758__auto__ = new cljs.core.Keyword(null,"result-type","result-type",4725630556).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(res));if(cljs.core.truth_(or__6758__auto__))
{return or__6758__auto__;
} else
{return new cljs.core.Keyword(null,"inline","inline",4124874251);
}
})();var ev = lt.util.cljs.__GT_dottedkw.call(null,new cljs.core.Keyword(null,"editor.eval.clj.result","editor.eval.clj.result",1582056205),type);return lt.object.raise.call(null,obj,ev,res);
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure","clj-result","lt.plugins.clojure/clj-result",1703646583),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.__BEH__clj_result,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"editor.eval.clj.result","editor.eval.clj.result",1582056205),null], null), null));
lt.plugins.clojure.__BEH__clj_result__DOT__replace = (function __BEH__clj_result__DOT__replace(obj,res){var seq__8624 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"results","results",2111450984).cljs$core$IFn$_invoke$arity$1(res));var chunk__8626 = null;var count__8627 = 0;var i__8628 = 0;while(true){
if((i__8628 < count__8627))
{var result = cljs.core._nth.call(null,chunk__8626,i__8628);var meta_8705 = new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(result);var loc_8706 = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",1017226086),(new cljs.core.Keyword(null,"end-line","end-line",2693041432).cljs$core$IFn$_invoke$arity$1(meta_8705) - 1),new cljs.core.Keyword(null,"ch","ch",1013907415),new cljs.core.Keyword(null,"end-column","end-column",3799845882).cljs$core$IFn$_invoke$arity$1(meta_8705),new cljs.core.Keyword(null,"start-line","start-line",3689311729),(new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(meta_8705) - 1)], null);if(cljs.core.truth_(new cljs.core.Keyword(null,"stack","stack",1123661306).cljs$core$IFn$_invoke$arity$1(result)))
{lt.objs.notifos.set_msg_BANG_.call(null,new cljs.core.Keyword(null,"result","result",4374444943).cljs$core$IFn$_invoke$arity$1(res),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",1108647146),"error"], null));
} else
{lt.objs.editor.replace_selection.call(null,obj,new cljs.core.Keyword(null,"result","result",4374444943).cljs$core$IFn$_invoke$arity$1(result));
}
{
var G__8707 = seq__8624;
var G__8708 = chunk__8626;
var G__8709 = count__8627;
var G__8710 = (i__8628 + 1);
seq__8624 = G__8707;
chunk__8626 = G__8708;
count__8627 = G__8709;
i__8628 = G__8710;
continue;
}
} else
{var temp__4092__auto__ = cljs.core.seq.call(null,seq__8624);if(temp__4092__auto__)
{var seq__8624__$1 = temp__4092__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,seq__8624__$1))
{var c__7500__auto__ = cljs.core.chunk_first.call(null,seq__8624__$1);{
var G__8711 = cljs.core.chunk_rest.call(null,seq__8624__$1);
var G__8712 = c__7500__auto__;
var G__8713 = cljs.core.count.call(null,c__7500__auto__);
var G__8714 = 0;
seq__8624 = G__8711;
chunk__8626 = G__8712;
count__8627 = G__8713;
i__8628 = G__8714;
continue;
}
} else
{var result = cljs.core.first.call(null,seq__8624__$1);var meta_8715 = new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(result);var loc_8716 = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",1017226086),(new cljs.core.Keyword(null,"end-line","end-line",2693041432).cljs$core$IFn$_invoke$arity$1(meta_8715) - 1),new cljs.core.Keyword(null,"ch","ch",1013907415),new cljs.core.Keyword(null,"end-column","end-column",3799845882).cljs$core$IFn$_invoke$arity$1(meta_8715),new cljs.core.Keyword(null,"start-line","start-line",3689311729),(new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(meta_8715) - 1)], null);if(cljs.core.truth_(new cljs.core.Keyword(null,"stack","stack",1123661306).cljs$core$IFn$_invoke$arity$1(result)))
{lt.objs.notifos.set_msg_BANG_.call(null,new cljs.core.Keyword(null,"result","result",4374444943).cljs$core$IFn$_invoke$arity$1(res),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",1108647146),"error"], null));
} else
{lt.objs.editor.replace_selection.call(null,obj,new cljs.core.Keyword(null,"result","result",4374444943).cljs$core$IFn$_invoke$arity$1(result));
}
{
var G__8717 = cljs.core.next.call(null,seq__8624__$1);
var G__8718 = null;
var G__8719 = 0;
var G__8720 = 0;
seq__8624 = G__8717;
chunk__8626 = G__8718;
count__8627 = G__8719;
i__8628 = G__8720;
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
lt.plugins.clojure.__BEH__clj_result__DOT__statusbar = (function __BEH__clj_result__DOT__statusbar(obj,res){var seq__8636 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"results","results",2111450984).cljs$core$IFn$_invoke$arity$1(res));var chunk__8638 = null;var count__8639 = 0;var i__8640 = 0;while(true){
if((i__8640 < count__8639))
{var result = cljs.core._nth.call(null,chunk__8638,i__8640);var meta_8721 = new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(result);var loc_8722 = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",1017226086),(new cljs.core.Keyword(null,"end-line","end-line",2693041432).cljs$core$IFn$_invoke$arity$1(meta_8721) - 1),new cljs.core.Keyword(null,"ch","ch",1013907415),new cljs.core.Keyword(null,"end-column","end-column",3799845882).cljs$core$IFn$_invoke$arity$1(meta_8721),new cljs.core.Keyword(null,"start-line","start-line",3689311729),(new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(meta_8721) - 1)], null);if(cljs.core.truth_(new cljs.core.Keyword(null,"stack","stack",1123661306).cljs$core$IFn$_invoke$arity$1(result)))
{lt.objs.notifos.set_msg_BANG_.call(null,new cljs.core.Keyword(null,"result","result",4374444943).cljs$core$IFn$_invoke$arity$1(res),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",1108647146),"error"], null));
} else
{lt.objs.notifos.set_msg_BANG_.call(null,new cljs.core.Keyword(null,"result","result",4374444943).cljs$core$IFn$_invoke$arity$1(result),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",1108647146),"result"], null));
}
{
var G__8723 = seq__8636;
var G__8724 = chunk__8638;
var G__8725 = count__8639;
var G__8726 = (i__8640 + 1);
seq__8636 = G__8723;
chunk__8638 = G__8724;
count__8639 = G__8725;
i__8640 = G__8726;
continue;
}
} else
{var temp__4092__auto__ = cljs.core.seq.call(null,seq__8636);if(temp__4092__auto__)
{var seq__8636__$1 = temp__4092__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,seq__8636__$1))
{var c__7500__auto__ = cljs.core.chunk_first.call(null,seq__8636__$1);{
var G__8727 = cljs.core.chunk_rest.call(null,seq__8636__$1);
var G__8728 = c__7500__auto__;
var G__8729 = cljs.core.count.call(null,c__7500__auto__);
var G__8730 = 0;
seq__8636 = G__8727;
chunk__8638 = G__8728;
count__8639 = G__8729;
i__8640 = G__8730;
continue;
}
} else
{var result = cljs.core.first.call(null,seq__8636__$1);var meta_8731 = new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(result);var loc_8732 = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",1017226086),(new cljs.core.Keyword(null,"end-line","end-line",2693041432).cljs$core$IFn$_invoke$arity$1(meta_8731) - 1),new cljs.core.Keyword(null,"ch","ch",1013907415),new cljs.core.Keyword(null,"end-column","end-column",3799845882).cljs$core$IFn$_invoke$arity$1(meta_8731),new cljs.core.Keyword(null,"start-line","start-line",3689311729),(new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(meta_8731) - 1)], null);if(cljs.core.truth_(new cljs.core.Keyword(null,"stack","stack",1123661306).cljs$core$IFn$_invoke$arity$1(result)))
{lt.objs.notifos.set_msg_BANG_.call(null,new cljs.core.Keyword(null,"result","result",4374444943).cljs$core$IFn$_invoke$arity$1(res),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",1108647146),"error"], null));
} else
{lt.objs.notifos.set_msg_BANG_.call(null,new cljs.core.Keyword(null,"result","result",4374444943).cljs$core$IFn$_invoke$arity$1(result),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",1108647146),"result"], null));
}
{
var G__8733 = cljs.core.next.call(null,seq__8636__$1);
var G__8734 = null;
var G__8735 = 0;
var G__8736 = 0;
seq__8636 = G__8733;
chunk__8638 = G__8734;
count__8639 = G__8735;
i__8640 = G__8736;
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
lt.plugins.clojure.__BEH__clj_result__DOT__inline = (function __BEH__clj_result__DOT__inline(obj,res){var seq__8648 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"results","results",2111450984).cljs$core$IFn$_invoke$arity$1(res));var chunk__8650 = null;var count__8651 = 0;var i__8652 = 0;while(true){
if((i__8652 < count__8651))
{var result = cljs.core._nth.call(null,chunk__8650,i__8652);var meta_8737 = new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(result);var loc_8738 = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",1017226086),(new cljs.core.Keyword(null,"end-line","end-line",2693041432).cljs$core$IFn$_invoke$arity$1(meta_8737) - 1),new cljs.core.Keyword(null,"ch","ch",1013907415),new cljs.core.Keyword(null,"end-column","end-column",3799845882).cljs$core$IFn$_invoke$arity$1(meta_8737),new cljs.core.Keyword(null,"start-line","start-line",3689311729),(new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(meta_8737) - 1)], null);if(cljs.core.truth_(new cljs.core.Keyword(null,"stack","stack",1123661306).cljs$core$IFn$_invoke$arity$1(result)))
{lt.object.raise.call(null,obj,new cljs.core.Keyword(null,"editor.eval.clj.exception","editor.eval.clj.exception",3664192387),result,new cljs.core.Keyword(null,"passed","passed",4313490402));
} else
{lt.object.raise.call(null,obj,new cljs.core.Keyword(null,"editor.result","editor.result",4030217008),new cljs.core.Keyword(null,"result","result",4374444943).cljs$core$IFn$_invoke$arity$1(result),loc_8738);
}
{
var G__8739 = seq__8648;
var G__8740 = chunk__8650;
var G__8741 = count__8651;
var G__8742 = (i__8652 + 1);
seq__8648 = G__8739;
chunk__8650 = G__8740;
count__8651 = G__8741;
i__8652 = G__8742;
continue;
}
} else
{var temp__4092__auto__ = cljs.core.seq.call(null,seq__8648);if(temp__4092__auto__)
{var seq__8648__$1 = temp__4092__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,seq__8648__$1))
{var c__7500__auto__ = cljs.core.chunk_first.call(null,seq__8648__$1);{
var G__8743 = cljs.core.chunk_rest.call(null,seq__8648__$1);
var G__8744 = c__7500__auto__;
var G__8745 = cljs.core.count.call(null,c__7500__auto__);
var G__8746 = 0;
seq__8648 = G__8743;
chunk__8650 = G__8744;
count__8651 = G__8745;
i__8652 = G__8746;
continue;
}
} else
{var result = cljs.core.first.call(null,seq__8648__$1);var meta_8747 = new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(result);var loc_8748 = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",1017226086),(new cljs.core.Keyword(null,"end-line","end-line",2693041432).cljs$core$IFn$_invoke$arity$1(meta_8747) - 1),new cljs.core.Keyword(null,"ch","ch",1013907415),new cljs.core.Keyword(null,"end-column","end-column",3799845882).cljs$core$IFn$_invoke$arity$1(meta_8747),new cljs.core.Keyword(null,"start-line","start-line",3689311729),(new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(meta_8747) - 1)], null);if(cljs.core.truth_(new cljs.core.Keyword(null,"stack","stack",1123661306).cljs$core$IFn$_invoke$arity$1(result)))
{lt.object.raise.call(null,obj,new cljs.core.Keyword(null,"editor.eval.clj.exception","editor.eval.clj.exception",3664192387),result,new cljs.core.Keyword(null,"passed","passed",4313490402));
} else
{lt.object.raise.call(null,obj,new cljs.core.Keyword(null,"editor.result","editor.result",4030217008),new cljs.core.Keyword(null,"result","result",4374444943).cljs$core$IFn$_invoke$arity$1(result),loc_8748);
}
{
var G__8749 = cljs.core.next.call(null,seq__8648__$1);
var G__8750 = null;
var G__8751 = 0;
var G__8752 = 0;
seq__8648 = G__8749;
chunk__8650 = G__8750;
count__8651 = G__8751;
i__8652 = G__8752;
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
lt.plugins.clojure.__BEH__clj_result__DOT__inline_at_cursor = (function __BEH__clj_result__DOT__inline_at_cursor(obj,res){var seq__8660 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"results","results",2111450984).cljs$core$IFn$_invoke$arity$1(res));var chunk__8662 = null;var count__8663 = 0;var i__8664 = 0;while(true){
if((i__8664 < count__8663))
{var result = cljs.core._nth.call(null,chunk__8662,i__8664);var meta_8753 = new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(result);var loc_8754 = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"line","line",1017226086),new cljs.core.Keyword(null,"start","start",1123661780).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(res)),new cljs.core.Keyword(null,"start-line","start-line",3689311729),new cljs.core.Keyword(null,"start","start",1123661780).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(res))], null);if(cljs.core.truth_(new cljs.core.Keyword(null,"stack","stack",1123661306).cljs$core$IFn$_invoke$arity$1(result)))
{lt.object.raise.call(null,obj,new cljs.core.Keyword(null,"editor.eval.clj.exception","editor.eval.clj.exception",3664192387),result,new cljs.core.Keyword(null,"passed","passed",4313490402));
} else
{lt.object.raise.call(null,obj,new cljs.core.Keyword(null,"editor.result","editor.result",4030217008),new cljs.core.Keyword(null,"result","result",4374444943).cljs$core$IFn$_invoke$arity$1(result),loc_8754);
}
{
var G__8755 = seq__8660;
var G__8756 = chunk__8662;
var G__8757 = count__8663;
var G__8758 = (i__8664 + 1);
seq__8660 = G__8755;
chunk__8662 = G__8756;
count__8663 = G__8757;
i__8664 = G__8758;
continue;
}
} else
{var temp__4092__auto__ = cljs.core.seq.call(null,seq__8660);if(temp__4092__auto__)
{var seq__8660__$1 = temp__4092__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,seq__8660__$1))
{var c__7500__auto__ = cljs.core.chunk_first.call(null,seq__8660__$1);{
var G__8759 = cljs.core.chunk_rest.call(null,seq__8660__$1);
var G__8760 = c__7500__auto__;
var G__8761 = cljs.core.count.call(null,c__7500__auto__);
var G__8762 = 0;
seq__8660 = G__8759;
chunk__8662 = G__8760;
count__8663 = G__8761;
i__8664 = G__8762;
continue;
}
} else
{var result = cljs.core.first.call(null,seq__8660__$1);var meta_8763 = new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(result);var loc_8764 = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"line","line",1017226086),new cljs.core.Keyword(null,"start","start",1123661780).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(res)),new cljs.core.Keyword(null,"start-line","start-line",3689311729),new cljs.core.Keyword(null,"start","start",1123661780).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(res))], null);if(cljs.core.truth_(new cljs.core.Keyword(null,"stack","stack",1123661306).cljs$core$IFn$_invoke$arity$1(result)))
{lt.object.raise.call(null,obj,new cljs.core.Keyword(null,"editor.eval.clj.exception","editor.eval.clj.exception",3664192387),result,new cljs.core.Keyword(null,"passed","passed",4313490402));
} else
{lt.object.raise.call(null,obj,new cljs.core.Keyword(null,"editor.result","editor.result",4030217008),new cljs.core.Keyword(null,"result","result",4374444943).cljs$core$IFn$_invoke$arity$1(result),loc_8764);
}
{
var G__8765 = cljs.core.next.call(null,seq__8660__$1);
var G__8766 = null;
var G__8767 = 0;
var G__8768 = 0;
seq__8660 = G__8765;
chunk__8662 = G__8766;
count__8663 = G__8767;
i__8664 = G__8768;
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
lt.plugins.clojure.__BEH__clj_result__DOT__return = (function __BEH__clj_result__DOT__return(obj,res){var seq__8672 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"results","results",2111450984).cljs$core$IFn$_invoke$arity$1(res));var chunk__8674 = null;var count__8675 = 0;var i__8676 = 0;while(true){
if((i__8676 < count__8675))
{var result = cljs.core._nth.call(null,chunk__8674,i__8676);var meta_8769 = new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(result);var handler_8770 = lt.object.by_id.call(null,new cljs.core.Keyword(null,"handler","handler",1706707644).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(res)));var loc_8771 = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"line","line",1017226086),new cljs.core.Keyword(null,"start","start",1123661780).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(res)),new cljs.core.Keyword(null,"start-line","start-line",3689311729),new cljs.core.Keyword(null,"start","start",1123661780).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(res))], null);if(cljs.core.truth_(new cljs.core.Keyword(null,"stack","stack",1123661306).cljs$core$IFn$_invoke$arity$1(result)))
{lt.object.raise.call(null,obj,new cljs.core.Keyword(null,"editor.eval.clj.exception","editor.eval.clj.exception",3664192387),result,new cljs.core.Keyword(null,"passed","passed",4313490402));
} else
{lt.object.raise.call(null,handler_8770,new cljs.core.Keyword(null,"return","return",4374474914),new cljs.core.Keyword(null,"result","result",4374444943).cljs$core$IFn$_invoke$arity$1(result));
}
{
var G__8772 = seq__8672;
var G__8773 = chunk__8674;
var G__8774 = count__8675;
var G__8775 = (i__8676 + 1);
seq__8672 = G__8772;
chunk__8674 = G__8773;
count__8675 = G__8774;
i__8676 = G__8775;
continue;
}
} else
{var temp__4092__auto__ = cljs.core.seq.call(null,seq__8672);if(temp__4092__auto__)
{var seq__8672__$1 = temp__4092__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,seq__8672__$1))
{var c__7500__auto__ = cljs.core.chunk_first.call(null,seq__8672__$1);{
var G__8776 = cljs.core.chunk_rest.call(null,seq__8672__$1);
var G__8777 = c__7500__auto__;
var G__8778 = cljs.core.count.call(null,c__7500__auto__);
var G__8779 = 0;
seq__8672 = G__8776;
chunk__8674 = G__8777;
count__8675 = G__8778;
i__8676 = G__8779;
continue;
}
} else
{var result = cljs.core.first.call(null,seq__8672__$1);var meta_8780 = new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(result);var handler_8781 = lt.object.by_id.call(null,new cljs.core.Keyword(null,"handler","handler",1706707644).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(res)));var loc_8782 = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"line","line",1017226086),new cljs.core.Keyword(null,"start","start",1123661780).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(res)),new cljs.core.Keyword(null,"start-line","start-line",3689311729),new cljs.core.Keyword(null,"start","start",1123661780).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(res))], null);if(cljs.core.truth_(new cljs.core.Keyword(null,"stack","stack",1123661306).cljs$core$IFn$_invoke$arity$1(result)))
{lt.object.raise.call(null,obj,new cljs.core.Keyword(null,"editor.eval.clj.exception","editor.eval.clj.exception",3664192387),result,new cljs.core.Keyword(null,"passed","passed",4313490402));
} else
{lt.object.raise.call(null,handler_8781,new cljs.core.Keyword(null,"return","return",4374474914),new cljs.core.Keyword(null,"result","result",4374444943).cljs$core$IFn$_invoke$arity$1(result));
}
{
var G__8783 = cljs.core.next.call(null,seq__8672__$1);
var G__8784 = null;
var G__8785 = 0;
var G__8786 = 0;
seq__8672 = G__8783;
chunk__8674 = G__8784;
count__8675 = G__8785;
i__8676 = G__8786;
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
var meta = new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(res);var loc = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",1017226086),(new cljs.core.Keyword(null,"end-line","end-line",2693041432).cljs$core$IFn$_invoke$arity$1(meta) - 1),new cljs.core.Keyword(null,"ch","ch",1013907415),new cljs.core.Keyword(null,"end-column","end-column",3799845882).cljs$core$IFn$_invoke$arity$1(meta),new cljs.core.Keyword(null,"start-line","start-line",3689311729),(new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(meta) - 1)], null);var msg = (function (){var or__6758__auto__ = new cljs.core.Keyword(null,"stack","stack",1123661306).cljs$core$IFn$_invoke$arity$1(res);if(cljs.core.truth_(or__6758__auto__))
{return or__6758__auto__;
} else
{return new cljs.core.Keyword(null,"ex","ex",1013907493).cljs$core$IFn$_invoke$arity$1(res);
}
})();var stack = (function (){var or__6758__auto__ = new cljs.core.Keyword(null,"stack","stack",1123661306).cljs$core$IFn$_invoke$arity$1(res);if(cljs.core.truth_(or__6758__auto__))
{return or__6758__auto__;
} else
{var or__6758__auto____$1 = (cljs.core.truth_((function (){var and__6746__auto__ = new cljs.core.Keyword(null,"ex","ex",1013907493).cljs$core$IFn$_invoke$arity$1(res);if(cljs.core.truth_(and__6746__auto__))
{return new cljs.core.Keyword(null,"ex","ex",1013907493).cljs$core$IFn$_invoke$arity$1(res).stack;
} else
{return and__6746__auto__;
}
})())?new cljs.core.Keyword(null,"ex","ex",1013907493).cljs$core$IFn$_invoke$arity$1(res).stack:(cljs.core.truth_(new cljs.core.Keyword(null,"ex","ex",1013907493).cljs$core$IFn$_invoke$arity$1(res))?(cljs.core.truth_(new cljs.core.Keyword(null,"verbatim","verbatim",3307884968).cljs$core$IFn$_invoke$arity$1(meta))?new cljs.core.Keyword(null,"ex","ex",1013907493).cljs$core$IFn$_invoke$arity$1(res):cljs.core.pr_str.call(null,new cljs.core.Keyword(null,"ex","ex",1013907493).cljs$core$IFn$_invoke$arity$1(res))):null));if(cljs.core.truth_(or__6758__auto____$1))
{return or__6758__auto____$1;
} else
{var or__6758__auto____$2 = msg;if(cljs.core.truth_(or__6758__auto____$2))
{return or__6758__auto____$2;
} else
{return "Unknown error";
}
}
}
})();lt.objs.notifos.set_msg_BANG_.call(null,msg,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",1108647146),"error"], null));
return lt.object.raise.call(null,obj,new cljs.core.Keyword(null,"editor.exception","editor.exception",3983021184),stack,loc);
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure","cljs-exception","lt.plugins.clojure/cljs-exception",2874453634),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.__BEH__cljs_exception,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"editor.eval.cljs.exception","editor.eval.cljs.exception",4479049174),null], null), null));
lt.plugins.clojure.__BEH__eval_location = (function __BEH__eval_location(obj,loc){return null;
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure","eval-location","lt.plugins.clojure/eval-location",1481997556),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.__BEH__eval_location,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"editor.eval.clj.location","editor.eval.clj.location",3783930661),null,new cljs.core.Keyword(null,"editor.eval.cljs.location","editor.eval.cljs.location",1870553714),null], null), null));
lt.plugins.clojure.__BEH__eval_print = (function __BEH__eval_print(this$,str){if(cljs.core.not_EQ_.call(null,"\n",new cljs.core.Keyword(null,"out","out",1014014656).cljs$core$IFn$_invoke$arity$1(str)))
{return lt.objs.console.loc_log.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"file","file",1017047278),lt.objs.files.basename.call(null,(function (){var or__6758__auto__ = new cljs.core.Keyword(null,"name","name",1017277949).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$));if(cljs.core.truth_(or__6758__auto__))
{return or__6758__auto__;
} else
{var or__6758__auto____$1 = new cljs.core.Keyword(null,"path","path",1017337751).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"info","info",1017141280).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)));if(cljs.core.truth_(or__6758__auto____$1))
{return or__6758__auto____$1;
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
lt.object.object_STAR_.call(null,new cljs.core.Keyword(null,"langs.clj","langs.clj",2528862058),new cljs.core.Keyword(null,"tags","tags",1017456523),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"clojure.lang","clojure.lang",4535056938),null], null), null));
lt.plugins.clojure.clj_lang = lt.object.create.call(null,new cljs.core.Keyword(null,"langs.clj","langs.clj",2528862058));
lt.plugins.clojure.__BEH__java_exe = (function __BEH__java_exe(this$,path){return lt.object.merge_BANG_.call(null,lt.plugins.clojure.clj_lang,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"java-exe","java-exe",4725979993),path], null));
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure","java-exe","lt.plugins.clojure/java-exe",635643605),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.__BEH__java_exe,new cljs.core.Keyword(null,"desc","desc",1016984067),"Clojure: set the path to the Java executable for clients",new cljs.core.Keyword(null,"params","params",4313443576),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"label","label",1116631654),"path"], null)], null),new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"object.instant","object.instant",773332388),null], null), null),new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"user","user",1017503549),new cljs.core.Keyword(null,"exclusive","exclusive",2700522000),true);
lt.plugins.clojure.__BEH__require_jar = (function __BEH__require_jar(this$,path){var code = cljs.core.pr_str.call(null,cljs.core.with_meta.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,cljs.core.with_meta.call(null,new cljs.core.Symbol("pomegranate","add-classpath","pomegranate/add-classpath",-1341356599,null),cljs.core.apply.call(null,cljs.core.hash_map,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Keyword(null,"line","line",1017226086)),cljs.core._conj.call(null,cljs.core.List.EMPTY,471),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Keyword(null,"column","column",3954034376)),cljs.core._conj.call(null,cljs.core.List.EMPTY,44),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Keyword(null,"end-line","end-line",2693041432)),cljs.core._conj.call(null,cljs.core.List.EMPTY,471),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Keyword(null,"end-column","end-column",3799845882)),cljs.core._conj.call(null,cljs.core.List.EMPTY,69)))))),cljs.core._conj.call(null,cljs.core.List.EMPTY,path))),cljs.core.apply.call(null,cljs.core.hash_map,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Keyword(null,"line","line",1017226086)),cljs.core._conj.call(null,cljs.core.List.EMPTY,471),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Keyword(null,"column","column",3954034376)),cljs.core._conj.call(null,cljs.core.List.EMPTY,43),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Keyword(null,"end-line","end-line",2693041432)),cljs.core._conj.call(null,cljs.core.List.EMPTY,471),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Keyword(null,"end-column","end-column",3799845882)),cljs.core._conj.call(null,cljs.core.List.EMPTY,76))))));return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"send!","send!",1123226891),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"cb","cb",1013907409),lt.object.__GT_id.call(null,this$),new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"editor.eval.clj","editor.eval.clj",1083014050),new cljs.core.Keyword(null,"data","data",1016980252),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"code","code",1016963423),code,new cljs.core.Keyword(null,"ns","ns",1013907767),"user",new cljs.core.Keyword(null,"meta","meta",1017252215),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"result-type","result-type",4725630556),new cljs.core.Keyword(null,"dependencies","dependencies",1517678747)], null)], null)], null));
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure","require-jar","lt.plugins.clojure/require-jar",1833506945),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.__BEH__require_jar,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"connect","connect",1965255772),null], null), null));
lt.plugins.clojure.__BEH__connect = (function __BEH__connect(this$,path){return lt.plugins.clojure.try_connect.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"info","info",1017141280),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"path","path",1017337751),path], null)], null));
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure","connect","lt.plugins.clojure/connect",3228562392),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.__BEH__connect,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"connect","connect",1965255772),null], null), null));
lt.objs.sidebar.clients.add_connector.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"name","name",1017277949),"Clojure",new cljs.core.Keyword(null,"desc","desc",1016984067),"Select a project.clj to connect to for either Clojure or ClojureScript.",new cljs.core.Keyword(null,"connect","connect",1965255772),(function (){return lt.objs.dialogs.file.call(null,lt.plugins.clojure.clj_lang,new cljs.core.Keyword(null,"connect","connect",1965255772));
})], null));
lt.plugins.clojure.server_input = (function server_input(){var e__8120__auto__ = crate.core.html.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input","input",1114262332),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1017479852),"text",new cljs.core.Keyword(null,"placeholder","placeholder",1612151013),"host:port",new cljs.core.Keyword(null,"value","value",1125876963),"localhost:"], null)], null));var seq__8684_8787 = cljs.core.seq.call(null,cljs.core.partition.call(null,2,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"focus","focus",1111509066),(function (){return lt.objs.context.in_BANG_.call(null,new cljs.core.Keyword(null,"popup.input","popup.input",4788025210));
}),new cljs.core.Keyword(null,"blur","blur",1016931289),(function (){return lt.objs.context.out_BANG_.call(null,new cljs.core.Keyword(null,"popup.input","popup.input",4788025210));
})], null)));var chunk__8685_8788 = null;var count__8686_8789 = 0;var i__8687_8790 = 0;while(true){
if((i__8687_8790 < count__8686_8789))
{var vec__8688_8791 = cljs.core._nth.call(null,chunk__8685_8788,i__8687_8790);var ev__8121__auto___8792 = cljs.core.nth.call(null,vec__8688_8791,0,null);var func__8122__auto___8793 = cljs.core.nth.call(null,vec__8688_8791,1,null);lt.util.dom.on.call(null,e__8120__auto__,ev__8121__auto___8792,func__8122__auto___8793);
{
var G__8794 = seq__8684_8787;
var G__8795 = chunk__8685_8788;
var G__8796 = count__8686_8789;
var G__8797 = (i__8687_8790 + 1);
seq__8684_8787 = G__8794;
chunk__8685_8788 = G__8795;
count__8686_8789 = G__8796;
i__8687_8790 = G__8797;
continue;
}
} else
{var temp__4092__auto___8798 = cljs.core.seq.call(null,seq__8684_8787);if(temp__4092__auto___8798)
{var seq__8684_8799__$1 = temp__4092__auto___8798;if(cljs.core.chunked_seq_QMARK_.call(null,seq__8684_8799__$1))
{var c__7500__auto___8800 = cljs.core.chunk_first.call(null,seq__8684_8799__$1);{
var G__8801 = cljs.core.chunk_rest.call(null,seq__8684_8799__$1);
var G__8802 = c__7500__auto___8800;
var G__8803 = cljs.core.count.call(null,c__7500__auto___8800);
var G__8804 = 0;
seq__8684_8787 = G__8801;
chunk__8685_8788 = G__8802;
count__8686_8789 = G__8803;
i__8687_8790 = G__8804;
continue;
}
} else
{var vec__8689_8805 = cljs.core.first.call(null,seq__8684_8799__$1);var ev__8121__auto___8806 = cljs.core.nth.call(null,vec__8689_8805,0,null);var func__8122__auto___8807 = cljs.core.nth.call(null,vec__8689_8805,1,null);lt.util.dom.on.call(null,e__8120__auto__,ev__8121__auto___8806,func__8122__auto___8807);
{
var G__8808 = cljs.core.next.call(null,seq__8684_8799__$1);
var G__8809 = null;
var G__8810 = 0;
var G__8811 = 0;
seq__8684_8787 = G__8808;
chunk__8685_8788 = G__8809;
count__8686_8789 = G__8810;
i__8687_8790 = G__8811;
continue;
}
}
} else
{}
}
break;
}
return e__8120__auto__;
});
lt.plugins.clojure.connect_to_remote = (function connect_to_remote(server){var vec__8691 = clojure.string.split.call(null,server,":");var host = cljs.core.nth.call(null,vec__8691,0,null);var port = cljs.core.nth.call(null,vec__8691,1,null);if(cljs.core.truth_((function (){var and__6746__auto__ = host;if(cljs.core.truth_(and__6746__auto__))
{return port;
} else
{return and__6746__auto__;
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
lt.plugins.clojure.__BEH__clj_doc = (function __BEH__clj_doc(editor){var token = lt.plugins.clojure.find_symbol_at_cursor.call(null,editor);var command = new cljs.core.Keyword(null,"editor.clj.doc","editor.clj.doc",4087602908);var info = cljs.core.assoc.call(null,cljs.core.deref.call(null,editor).call(null,new cljs.core.Keyword(null,"info","info",1017141280)),new cljs.core.Keyword(null,"result-type","result-type",4725630556),new cljs.core.Keyword(null,"doc","doc",1014003882),new cljs.core.Keyword(null,"loc","loc",1014011570),new cljs.core.Keyword(null,"loc","loc",1014011570).cljs$core$IFn$_invoke$arity$1(token),new cljs.core.Keyword(null,"sym","sym",1014018617),new cljs.core.Keyword(null,"string","string",4416885635).cljs$core$IFn$_invoke$arity$1(token),new cljs.core.Keyword(null,"print-length","print-length",3960797560),lt.object.raise_reduce.call(null,editor,new cljs.core.Keyword(null,"clojure.print-length+","clojure.print-length+",4366367949),null),new cljs.core.Keyword(null,"code","code",1016963423),lt.plugins.watches.watched_range.call(null,editor,null,null,lt.plugins.clojure.clj_watch));if(cljs.core.truth_(token))
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
lt.plugins.clojure.find_symbol_at_cursor = (function find_symbol_at_cursor(editor){var loc = lt.objs.editor.__GT_cursor.call(null,editor);var token_left = lt.objs.editor.__GT_token.call(null,editor,loc);var token_right = lt.objs.editor.__GT_token.call(null,editor,cljs.core.update_in.call(null,loc,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ch","ch",1013907415)], null),cljs.core.inc));var or__6758__auto__ = (cljs.core.truth_(lt.plugins.clojure.symbol_token_QMARK_.call(null,new cljs.core.Keyword(null,"string","string",4416885635).cljs$core$IFn$_invoke$arity$1(token_right)))?cljs.core.assoc.call(null,token_right,new cljs.core.Keyword(null,"loc","loc",1014011570),loc):null);if(cljs.core.truth_(or__6758__auto__))
{return or__6758__auto__;
} else
{if(cljs.core.truth_(lt.plugins.clojure.symbol_token_QMARK_.call(null,new cljs.core.Keyword(null,"string","string",4416885635).cljs$core$IFn$_invoke$arity$1(token_left))))
{return cljs.core.assoc.call(null,token_left,new cljs.core.Keyword(null,"loc","loc",1014011570),loc);
} else
{return null;
}
}
});
lt.plugins.clojure.__BEH__cljs_doc = (function __BEH__cljs_doc(editor){var token = lt.plugins.clojure.find_symbol_at_cursor.call(null,editor);var command = new cljs.core.Keyword(null,"editor.cljs.doc","editor.cljs.doc",1871386511);var info = cljs.core.assoc.call(null,cljs.core.deref.call(null,editor).call(null,new cljs.core.Keyword(null,"info","info",1017141280)),new cljs.core.Keyword(null,"result-type","result-type",4725630556),new cljs.core.Keyword(null,"doc","doc",1014003882),new cljs.core.Keyword(null,"loc","loc",1014011570),new cljs.core.Keyword(null,"loc","loc",1014011570).cljs$core$IFn$_invoke$arity$1(token),new cljs.core.Keyword(null,"sym","sym",1014018617),new cljs.core.Keyword(null,"string","string",4416885635).cljs$core$IFn$_invoke$arity$1(token),new cljs.core.Keyword(null,"print-length","print-length",3960797560),lt.object.raise_reduce.call(null,editor,new cljs.core.Keyword(null,"clojure.print-length+","clojure.print-length+",4366367949),null),new cljs.core.Keyword(null,"code","code",1016963423),lt.plugins.watches.watched_range.call(null,editor,null,null,lt.plugins.clojure.cljs_watch));if(cljs.core.truth_(token))
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
lt.plugins.clojure.__BEH__finish_jump_to_definition = (function __BEH__finish_jump_to_definition(editor,p__8692){var map__8694 = p__8692;var map__8694__$1 = ((cljs.core.seq_QMARK_.call(null,map__8694))?cljs.core.apply.call(null,cljs.core.hash_map,map__8694):map__8694);var res = map__8694__$1;var line = cljs.core.get.call(null,map__8694__$1,new cljs.core.Keyword(null,"line","line",1017226086));var file = cljs.core.get.call(null,map__8694__$1,new cljs.core.Keyword(null,"file","file",1017047278));if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"jump","jump",1017178016),new cljs.core.Keyword(null,"result-type","result-type",4725630556).cljs$core$IFn$_invoke$arity$1(res)))
{if(cljs.core.truth_((function (){var and__6746__auto__ = res;if(cljs.core.truth_(and__6746__auto__))
{var and__6746__auto____$1 = file;if(cljs.core.truth_(and__6746__auto____$1))
{return line;
} else
{return and__6746__auto____$1;
}
} else
{return and__6746__auto__;
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
lt.plugins.clojure.escape_spaces = (function escape_spaces(s){if(cljs.core._EQ_.call(null,lt.objs.files.separator,"\\"))
{return lt.plugins.clojure.wrap_quotes.call(null,s);
} else
{return clojure.string.replace.call(null,s,/ /,"\\ ");
}
});
lt.plugins.clojure.windows_escape = (function windows_escape(s){if(cljs.core.truth_((function (){var and__6746__auto__ = lt.util.cljs.str_contains_QMARK_.call(null,s," ");if(cljs.core.truth_(and__6746__auto__))
{return lt.objs.platform.win_QMARK_.call(null);
} else
{return and__6746__auto__;
}
})()))
{return lt.plugins.clojure.wrap_quotes.call(null,s);
} else
{return s;
}
});
lt.plugins.clojure.jar_command = (function jar_command(path,name,client){return [cljs.core.str((function (){var or__6758__auto__ = new cljs.core.Keyword(null,"java-exe","java-exe",4725979993).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.plugins.clojure.clj_lang));if(cljs.core.truth_(or__6758__auto__))
{return or__6758__auto__;
} else
{return "java";
}
})()),cljs.core.str(" -jar "),cljs.core.str(lt.plugins.clojure.windows_escape.call(null,lt.plugins.clojure.jar_path)),cljs.core.str(" "),cljs.core.str(name)].join('');
});
lt.plugins.clojure.run_jar = (function run_jar(p__8695){var map__8697 = p__8695;var map__8697__$1 = ((cljs.core.seq_QMARK_.call(null,map__8697))?cljs.core.apply.call(null,cljs.core.hash_map,map__8697):map__8697);var client = cljs.core.get.call(null,map__8697__$1,new cljs.core.Keyword(null,"client","client",3951159101));var name = cljs.core.get.call(null,map__8697__$1,new cljs.core.Keyword(null,"name","name",1017277949));var project_path = cljs.core.get.call(null,map__8697__$1,new cljs.core.Keyword(null,"project-path","project-path",1907176907));var path = cljs.core.get.call(null,map__8697__$1,new cljs.core.Keyword(null,"path","path",1017337751));var obj = lt.object.create.call(null,new cljs.core.Keyword("lt.plugins.clojure","connecting-notifier","lt.plugins.clojure/connecting-notifier",1801195529),lt.plugins.clojure.n,lt.objs.clients.__GT_id.call(null,client));var args = new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["-Xmx1g","-jar",lt.plugins.clojure.windows_escape.call(null,lt.plugins.clojure.jar_path)], null);lt.objs.notifos.working.call(null,"Connecting..");
lt.objs.console.core_log.write([cljs.core.str("STARTING CLIENT: "),cljs.core.str(lt.plugins.clojure.jar_command.call(null,project_path,name,client))].join(''));
lt.objs.proc.exec.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",1964298941),(function (){var or__6758__auto__ = new cljs.core.Keyword(null,"java-exe","java-exe",4725979993).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.plugins.clojure.clj_lang));if(cljs.core.truth_(or__6758__auto__))
{return or__6758__auto__;
} else
{return "java";
}
})(),new cljs.core.Keyword(null,"args","args",1016906831),(cljs.core.truth_(name)?cljs.core.conj.call(null,args,name):args),new cljs.core.Keyword(null,"cwd","cwd",1014003170),project_path,new cljs.core.Keyword(null,"obj","obj",1014014057),obj], null));
lt.object.merge_BANG_.call(null,client,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"dir","dir",1014003711),project_path], null));
return lt.object.raise.call(null,client,new cljs.core.Keyword(null,"try-connect!","try-connect!",1801329595));
});
lt.plugins.clojure.run_local_server = (function run_local_server(client){return lt.plugins.clojure.check_all.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"path","path",1017337751),lt.plugins.clojure.local_project_clj,new cljs.core.Keyword(null,"client","client",3951159101),client,new cljs.core.Keyword(null,"name","name",1017277949),lt.plugins.clojure.local_name], null));
});
lt.plugins.clojure.check_java = (function check_java(obj){return cljs.core.assoc.call(null,obj,new cljs.core.Keyword(null,"java","java",1017159060),(function (){var or__6758__auto__ = new cljs.core.Keyword(null,"java-exe","java-exe",4725979993).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.plugins.clojure.clj_lang));if(cljs.core.truth_(or__6758__auto__))
{return or__6758__auto__;
} else
{var or__6758__auto____$1 = (process.env["JAVA_HOME"]);if(cljs.core.truth_(or__6758__auto____$1))
{return or__6758__auto____$1;
} else
{return lt.plugins.clojure.shell.which("java");
}
}
})());
});
lt.plugins.clojure.check_ltjar = (function check_ltjar(obj){return cljs.core.assoc.call(null,obj,new cljs.core.Keyword(null,"ltjar","ltjar",1117205253),lt.objs.files.exists_QMARK_.call(null,lt.plugins.clojure.jar_path));
});
lt.plugins.clojure.find_project = (function find_project(obj){var p = new cljs.core.Keyword(null,"path","path",1017337751).cljs$core$IFn$_invoke$arity$1(obj);var roots = lt.objs.files.get_roots.call(null);var cur = p;var prev = "";while(true){
if(cljs.core.truth_((function (){var or__6758__auto__ = cljs.core.empty_QMARK_.call(null,cur);if(or__6758__auto__)
{return or__6758__auto__;
} else
{var or__6758__auto____$1 = roots.call(null,cur);if(cljs.core.truth_(or__6758__auto____$1))
{return or__6758__auto____$1;
} else
{return cljs.core._EQ_.call(null,cur,prev);
}
}
})()))
{return cljs.core.assoc.call(null,obj,new cljs.core.Keyword(null,"project-path","project-path",1907176907),null);
} else
{if(cljs.core.truth_(lt.objs.files.exists_QMARK_.call(null,lt.objs.files.join.call(null,cur,"project.clj"))))
{return cljs.core.assoc.call(null,obj,new cljs.core.Keyword(null,"project-path","project-path",1907176907),cur);
} else
{{
var G__8812 = lt.objs.files.parent.call(null,cur);
var G__8813 = cur;
cur = G__8812;
prev = G__8813;
continue;
}
}
}
break;
}
});
lt.plugins.clojure.notify = (function notify(obj){var map__8699 = obj;var map__8699__$1 = ((cljs.core.seq_QMARK_.call(null,map__8699))?cljs.core.apply.call(null,cljs.core.hash_map,map__8699):map__8699);var ltjar = cljs.core.get.call(null,map__8699__$1,new cljs.core.Keyword(null,"ltjar","ltjar",1117205253));var path = cljs.core.get.call(null,map__8699__$1,new cljs.core.Keyword(null,"path","path",1017337751));var project_path = cljs.core.get.call(null,map__8699__$1,new cljs.core.Keyword(null,"project-path","project-path",1907176907));var java = cljs.core.get.call(null,map__8699__$1,new cljs.core.Keyword(null,"java","java",1017159060));if((cljs.core.not.call(null,java)) || (cljs.core.empty_QMARK_.call(null,java)))
{lt.objs.popup.popup_BANG_.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"header","header",4087600639),"We couldn't find java.",new cljs.core.Keyword(null,"body","body",1016933652),"Clojure evaluation requires the JDK to be installed.",new cljs.core.Keyword(null,"buttons","buttons",1255256819),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"label","label",1116631654),"Download the JDK",new cljs.core.Keyword(null,"action","action",3885920680),(function (){return lt.objs.platform.open.call(null,"http://www.oracle.com/technetwork/java/javase/downloads/jdk7-downloads-1880260.html");
})], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"label","label",1116631654),"ok"], null)], null)], null));
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
}
if(!lt.util.load.provided_QMARK_('lt.plugins.clojure.instarepl')) {
goog.provide('lt.plugins.clojure.instarepl');
goog.require('cljs.core');
goog.require('lt.util.dom');
goog.require('crate.binding');
goog.require('lt.plugins.clojure');
goog.require('lt.objs.sidebar.command');
goog.require('lt.util.dom');
goog.require('lt.objs.tabs');
goog.require('cljs.reader');
goog.require('crate.core');
goog.require('lt.objs.metrics');
goog.require('lt.objs.notifos');
goog.require('lt.objs.notifos');
goog.require('lt.objs.editor.pool');
goog.require('lt.plugins.watches');
goog.require('lt.objs.eval');
goog.require('lt.objs.clients');
goog.require('lt.plugins.clojure');
goog.require('lt.plugins.watches');
goog.require('crate.binding');
goog.require('lt.objs.editor');
goog.require('lt.object');
goog.require('cljs.reader');
goog.require('lt.object');
goog.require('lt.objs.console');
goog.require('lt.objs.tabs');
goog.require('lt.objs.editor');
goog.require('lt.objs.console');
goog.require('lt.objs.metrics');
goog.require('crate.core');
goog.require('lt.objs.eval');
goog.require('lt.objs.clients');
goog.require('lt.objs.editor.pool');
goog.require('lt.objs.sidebar.command');
lt.plugins.clojure.instarepl.__BEH__on_eval_sonar = (function __BEH__on_eval_sonar(obj,auto_QMARK_,pos_QMARK_){var ed = new cljs.core.Keyword(null,"ed","ed",1013907473).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,obj));var v = lt.plugins.watches.watched_range.call(null,obj,null,null,lt.plugins.clojure.clj_watch);var info = new cljs.core.Keyword(null,"info","info",1017141280).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,obj));var info__$1 = (cljs.core.truth_(lt.objs.editor.selection_QMARK_.call(null,ed))?cljs.core.assoc.call(null,info,new cljs.core.Keyword(null,"local","local",1117049565),true,new cljs.core.Keyword(null,"code","code",1016963423),lt.objs.editor.selection.call(null,ed),new cljs.core.Keyword(null,"auto?","auto?",1107086306),false,new cljs.core.Keyword(null,"meta","meta",1017252215),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"start","start",1123661780),new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(lt.objs.editor.__GT_cursor.call(null,ed,"start"))], null)):cljs.core.assoc.call(null,info,new cljs.core.Keyword(null,"local","local",1117049565),true,new cljs.core.Keyword(null,"code","code",1016963423),v,new cljs.core.Keyword(null,"auto?","auto?",1107086306),auto_QMARK_,new cljs.core.Keyword(null,"pos","pos",1014015430),(cljs.core.truth_(pos_QMARK_)?lt.objs.editor.__GT_cursor.call(null,ed):null)));var info__$2 = cljs.core.assoc.call(null,info__$1,new cljs.core.Keyword(null,"print-length","print-length",3960797560),lt.object.raise_reduce.call(null,obj,new cljs.core.Keyword(null,"clojure.print-length+","clojure.print-length+",4366367949),null));lt.objs.notifos.working.call(null,"");
return lt.objs.clients.send.call(null,lt.objs.eval.get_client_BANG_.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"origin","origin",4300251800),obj,new cljs.core.Keyword(null,"info","info",1017141280),info__$2,new cljs.core.Keyword(null,"create","create",3956577390),lt.plugins.clojure.try_connect,new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"editor.eval.clj.sonar","editor.eval.clj.sonar",3250205047)], null)),new cljs.core.Keyword(null,"editor.eval.clj.sonar","editor.eval.clj.sonar",3250205047),info__$2,new cljs.core.Keyword(null,"only","only",1017320222),new cljs.core.Keyword(null,"frame","frame",1111596255).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,obj)));
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure.instarepl","on-eval-sonar","lt.plugins.clojure.instarepl/on-eval-sonar",4156400393),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.instarepl.__BEH__on_eval_sonar,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"eval","eval",1017029646),null], null), null));
lt.plugins.clojure.instarepl.__BEH__on_eval_one = (function __BEH__on_eval_one(this$){return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"eval","eval",1017029646),false,new cljs.core.Keyword(null,"pos","pos",1014015430));
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure.instarepl","on-eval-one","lt.plugins.clojure.instarepl/on-eval-one",4133016684),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.instarepl.__BEH__on_eval_one,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"eval.one","eval.one",1173589382),null], null), null));
lt.plugins.clojure.instarepl.__BEH__eval_on_change = (function __BEH__eval_on_change(this$){var parent = cljs.core.deref.call(null,new cljs.core.Keyword(null,"frame","frame",1111596255).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)));if(cljs.core.truth_(new cljs.core.Keyword(null,"live","live",1017226334).cljs$core$IFn$_invoke$arity$1(parent)))
{return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"eval","eval",1017029646),true);
} else
{return null;
}
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure.instarepl","eval-on-change","lt.plugins.clojure.instarepl/eval-on-change",4136318206),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.instarepl.__BEH__eval_on_change,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"change","change",3947235106),null], null), null),new cljs.core.Keyword(null,"debounce","debounce",1556599227),300);
lt.plugins.clojure.instarepl.__BEH__sonar_result = (function __BEH__sonar_result(this$,res){lt.objs.notifos.done_working.call(null);
lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"error","error",1110689146),null], null));
lt.object.merge_BANG_.call(null,new cljs.core.Keyword(null,"main","main",1017248043).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"info","info",1017141280),cljs.core.assoc.call(null,new cljs.core.Keyword(null,"info","info",1017141280).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,new cljs.core.Keyword(null,"main","main",1017248043).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)))),new cljs.core.Keyword(null,"ns","ns",1013907767),(function (){var or__6758__auto__ = new cljs.core.Keyword(null,"ns","ns",1013907767).cljs$core$IFn$_invoke$arity$1(res);if(cljs.core.truth_(or__6758__auto__))
{return or__6758__auto__;
} else
{return "user";
}
})())], null));
return lt.plugins.clojure.instarepl.update_res.call(null,this$,res);
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure.instarepl","sonar-result","lt.plugins.clojure.instarepl/sonar-result",4674352776),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.instarepl.__BEH__sonar_result,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"editor.eval.clj.sonar.result","editor.eval.clj.sonar.result",4675879832),null], null), null));
lt.plugins.clojure.instarepl.__BEH__no_op = (function __BEH__no_op(this$){return lt.objs.notifos.done_working.call(null);
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure.instarepl","no-op","lt.plugins.clojure.instarepl/no-op",1616664318),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.instarepl.__BEH__no_op,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"editor.eval.clj.sonar.noop","editor.eval.clj.sonar.noop",633248029),null], null), null));
lt.plugins.clojure.instarepl.__BEH__clj_exception = (function __BEH__clj_exception(this$,ex){lt.objs.notifos.done_working.call(null);
return lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"error","error",1110689146),new cljs.core.Keyword(null,"msg","msg",1014012659).cljs$core$IFn$_invoke$arity$1(ex)], null));
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure.instarepl","clj-exception","lt.plugins.clojure.instarepl/clj-exception",4476668972),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.instarepl.__BEH__clj_exception,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"editor.eval.clj.exception","editor.eval.clj.exception",3664192387),null], null), null));
lt.plugins.clojure.instarepl.__BEH__destroy_on_close = (function __BEH__destroy_on_close(this$){return lt.object.raise.call(null,new cljs.core.Keyword(null,"main","main",1017248043).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)),new cljs.core.Keyword(null,"close","close",1108660586));
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure.instarepl","destroy-on-close","lt.plugins.clojure.instarepl/destroy-on-close",3503448974),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.instarepl.__BEH__destroy_on_close,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"close","close",1108660586),null], null), null));
lt.plugins.clojure.instarepl.__BEH__cleanup_on_destroy = (function __BEH__cleanup_on_destroy(this$){var seq__8463 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"widgets","widgets",2354242081).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,new cljs.core.Keyword(null,"main","main",1017248043).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)))));var chunk__8464 = null;var count__8465 = 0;var i__8466 = 0;while(true){
if((i__8466 < count__8465))
{var vec__8467 = cljs.core._nth.call(null,chunk__8464,i__8466);var _ = cljs.core.nth.call(null,vec__8467,0,null);var w = cljs.core.nth.call(null,vec__8467,1,null);lt.object.raise.call(null,w,new cljs.core.Keyword(null,"clear!","clear!",3951036134));
{
var G__8516 = seq__8463;
var G__8517 = chunk__8464;
var G__8518 = count__8465;
var G__8519 = (i__8466 + 1);
seq__8463 = G__8516;
chunk__8464 = G__8517;
count__8465 = G__8518;
i__8466 = G__8519;
continue;
}
} else
{var temp__4092__auto__ = cljs.core.seq.call(null,seq__8463);if(temp__4092__auto__)
{var seq__8463__$1 = temp__4092__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,seq__8463__$1))
{var c__7500__auto__ = cljs.core.chunk_first.call(null,seq__8463__$1);{
var G__8520 = cljs.core.chunk_rest.call(null,seq__8463__$1);
var G__8521 = c__7500__auto__;
var G__8522 = cljs.core.count.call(null,c__7500__auto__);
var G__8523 = 0;
seq__8463 = G__8520;
chunk__8464 = G__8521;
count__8465 = G__8522;
i__8466 = G__8523;
continue;
}
} else
{var vec__8468 = cljs.core.first.call(null,seq__8463__$1);var _ = cljs.core.nth.call(null,vec__8468,0,null);var w = cljs.core.nth.call(null,vec__8468,1,null);lt.object.raise.call(null,w,new cljs.core.Keyword(null,"clear!","clear!",3951036134));
{
var G__8524 = cljs.core.next.call(null,seq__8463__$1);
var G__8525 = null;
var G__8526 = 0;
var G__8527 = 0;
seq__8463 = G__8524;
chunk__8464 = G__8525;
count__8465 = G__8526;
i__8466 = G__8527;
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
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure.instarepl","cleanup-on-destroy","lt.plugins.clojure.instarepl/cleanup-on-destroy",2258310006),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.instarepl.__BEH__cleanup_on_destroy,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"destroy","destroy",2571277164),null], null), null));
lt.plugins.clojure.instarepl.__BEH__dirty_parent = (function __BEH__dirty_parent(this$){if(cljs.core.truth_(new cljs.core.Keyword(null,"frame","frame",1111596255).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$))))
{return lt.object.merge_BANG_.call(null,new cljs.core.Keyword(null,"frame","frame",1111596255).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"dirty","dirty",1109497668),new cljs.core.Keyword(null,"dirty","dirty",1109497668).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$))], null));
} else
{return null;
}
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure.instarepl","dirty-parent","lt.plugins.clojure.instarepl/dirty-parent",1369918886),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.instarepl.__BEH__dirty_parent,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"dirty","dirty",1109497668),null,new cljs.core.Keyword(null,"clean","clean",1108650427),null], null), null));
lt.plugins.clojure.instarepl.__BEH__close_parent = (function __BEH__close_parent(this$){return lt.object.destroy_BANG_.call(null,new cljs.core.Keyword(null,"frame","frame",1111596255).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)));
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure.instarepl","close-parent","lt.plugins.clojure.instarepl/close-parent",954399920),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.instarepl.__BEH__close_parent,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"destroy","destroy",2571277164),null], null), null));
lt.plugins.clojure.instarepl.__BEH__set_parent_title = (function __BEH__set_parent_title(this$){lt.object.remove_tags.call(null,this$,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"editor.clj","editor.clj",3751346322)], null));
return lt.object.merge_BANG_.call(null,new cljs.core.Keyword(null,"frame","frame",1111596255).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"name","name",1017277949),new cljs.core.Keyword(null,"name","name",1017277949).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"info","info",1017141280).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)))], null));
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure.instarepl","set-parent-title","lt.plugins.clojure.instarepl/set-parent-title",1782234505),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.instarepl.__BEH__set_parent_title,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"path-changed","path-changed",1619241086),null,new cljs.core.Keyword(null,"save-as","save-as",2886670836),null], null), null));
lt.plugins.clojure.instarepl.__BEH__on_show_refresh_eds = (function __BEH__on_show_refresh_eds(this$){lt.object.raise.call(null,new cljs.core.Keyword(null,"main","main",1017248043).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)),new cljs.core.Keyword(null,"show","show",1017433711));
lt.object.raise.call(null,new cljs.core.Keyword(null,"main","main",1017248043).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)),new cljs.core.Keyword(null,"refresh!","refresh!",4597922840));
return lt.objs.editor.focus.call(null,new cljs.core.Keyword(null,"main","main",1017248043).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)));
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure.instarepl","on-show-refresh-eds","lt.plugins.clojure.instarepl/on-show-refresh-eds",4726777769),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.instarepl.__BEH__on_show_refresh_eds,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"show","show",1017433711),null], null), null));
lt.plugins.clojure.instarepl.__BEH__reroute_watches = (function __BEH__reroute_watches(this$,r){return lt.object.raise.call(null,new cljs.core.Keyword(null,"main","main",1017248043).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)),new cljs.core.Keyword(null,"editor.eval.clj.watch","editor.eval.clj.watch",3253487875),r);
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure.instarepl","reroute-watches","lt.plugins.clojure.instarepl/reroute-watches",4417161607),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.instarepl.__BEH__reroute_watches,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"editor.eval.clj.watch","editor.eval.clj.watch",3253487875),null], null), null));
lt.plugins.clojure.instarepl.__BEH__on_focus_focus_ed = (function __BEH__on_focus_focus_ed(this$){return lt.object.raise.call(null,new cljs.core.Keyword(null,"main","main",1017248043).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)),new cljs.core.Keyword(null,"focus!","focus!",4039653819));
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure.instarepl","on-focus-focus-ed","lt.plugins.clojure.instarepl/on-focus-focus-ed",2511209304),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.instarepl.__BEH__on_focus_focus_ed,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"focus!","focus!",4039653819),null], null), null));
lt.plugins.clojure.instarepl.__BEH__live_toggle = (function __BEH__live_toggle(this$){lt.objs.sidebar.command.exec_BANG_.call(null,new cljs.core.Keyword(null,"clear-inline-results","clear-inline-results",1542062004));
lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"live","live",1017226334),cljs.core.not.call(null,new cljs.core.Keyword(null,"live","live",1017226334).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)))], null));
return lt.objs.editor.focus.call(null,new cljs.core.Keyword(null,"main","main",1017248043).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)));
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure.instarepl","live-toggle","lt.plugins.clojure.instarepl/live-toggle",4427655414),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.instarepl.__BEH__live_toggle,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"live.toggle!","live.toggle!",4497782717),null], null), null));
lt.plugins.clojure.instarepl.default_content = ";; Anything you type in here will be executed\n;; immediately with the results shown on the\n;; right.\n";
lt.plugins.clojure.instarepl.clean_ex = (function clean_ex(x){return x.replace((new RegExp("^.*user/eval[\\s\\S]*","gmi")),"");
});
lt.plugins.clojure.instarepl.__GT_type_BAR_val = (function __GT_type_BAR_val(r,vs){if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"root","root",1017410644).cljs$core$IFn$_invoke$arity$1(r),new cljs.core.Keyword(null,"result","result",4374444943)))
{return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["result",cljs.core.last.call(null,new cljs.core.Keyword(null,"cur","cur",1014003122).cljs$core$IFn$_invoke$arity$1(r))], null);
} else
{if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"root","root",1017410644).cljs$core$IFn$_invoke$arity$1(r),new cljs.core.Keyword(null,"ex","ex",1013907493)))
{return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["exception",lt.plugins.clojure.instarepl.clean_ex.call(null,cljs.core.last.call(null,new cljs.core.Keyword(null,"cur","cur",1014003122).cljs$core$IFn$_invoke$arity$1(r)))], null);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["use",cljs.core.get.call(null,vs,new cljs.core.Keyword(null,"root","root",1017410644).cljs$core$IFn$_invoke$arity$1(r))], null);
} else
{return null;
}
}
}
});
lt.plugins.clojure.instarepl.inline = (function inline(this$,res,opts){return lt.object.create.call(null,new cljs.core.Keyword("lt.objs.eval","inline-result","lt.objs.eval/inline-result",1807255869),new cljs.core.PersistentArrayMap(null, 7, [new cljs.core.Keyword(null,"ed","ed",1013907473),this$,new cljs.core.Keyword(null,"class","class",1108647146),cljs.core.name.call(null,new cljs.core.Keyword(null,"type","type",1017479852).cljs$core$IFn$_invoke$arity$2(opts,new cljs.core.Keyword(null,"inline","inline",4124874251))),new cljs.core.Keyword(null,"opts","opts",1017322386),opts,new cljs.core.Keyword(null,"trunc-length","trunc-length",2555961753),100,new cljs.core.Keyword(null,"result","result",4374444943),res,new cljs.core.Keyword(null,"loc","loc",1014011570),opts,new cljs.core.Keyword(null,"line","line",1017226086),lt.objs.editor.line_handle.call(null,this$,new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(opts))], null));
});
lt.plugins.clojure.instarepl.update_res = (function update_res(this$,results){var main = new cljs.core.Keyword(null,"main","main",1017248043).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$));var vs = cljs.reader.read_string.call(null,new cljs.core.Keyword(null,"vals","vals",1017516260).cljs$core$IFn$_invoke$arity$1(results));var repls = new cljs.core.Keyword(null,"uses","uses",1017503550).cljs$core$IFn$_invoke$arity$1(results);var out = new cljs.core.Keyword(null,"out","out",1014014656).cljs$core$IFn$_invoke$arity$1(results);return lt.objs.editor.operation.call(null,new cljs.core.Keyword(null,"main","main",1017248043).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)),(function (){var seq__8481_8528 = cljs.core.seq.call(null,new cljs.core.Keyword("lt.plugins.clojure.instarepl","widgets","lt.plugins.clojure.instarepl/widgets",653819200).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,main)));var chunk__8482_8529 = null;var count__8483_8530 = 0;var i__8484_8531 = 0;while(true){
if((i__8484_8531 < count__8483_8530))
{var w_8532 = cljs.core._nth.call(null,chunk__8482_8529,i__8484_8531);lt.object.raise.call(null,w_8532,new cljs.core.Keyword(null,"clear!","clear!",3951036134));
{
var G__8533 = seq__8481_8528;
var G__8534 = chunk__8482_8529;
var G__8535 = count__8483_8530;
var G__8536 = (i__8484_8531 + 1);
seq__8481_8528 = G__8533;
chunk__8482_8529 = G__8534;
count__8483_8530 = G__8535;
i__8484_8531 = G__8536;
continue;
}
} else
{var temp__4092__auto___8537 = cljs.core.seq.call(null,seq__8481_8528);if(temp__4092__auto___8537)
{var seq__8481_8538__$1 = temp__4092__auto___8537;if(cljs.core.chunked_seq_QMARK_.call(null,seq__8481_8538__$1))
{var c__7500__auto___8539 = cljs.core.chunk_first.call(null,seq__8481_8538__$1);{
var G__8540 = cljs.core.chunk_rest.call(null,seq__8481_8538__$1);
var G__8541 = c__7500__auto___8539;
var G__8542 = cljs.core.count.call(null,c__7500__auto___8539);
var G__8543 = 0;
seq__8481_8528 = G__8540;
chunk__8482_8529 = G__8541;
count__8483_8530 = G__8542;
i__8484_8531 = G__8543;
continue;
}
} else
{var w_8544 = cljs.core.first.call(null,seq__8481_8538__$1);lt.object.raise.call(null,w_8544,new cljs.core.Keyword(null,"clear!","clear!",3951036134));
{
var G__8545 = cljs.core.next.call(null,seq__8481_8538__$1);
var G__8546 = null;
var G__8547 = 0;
var G__8548 = 0;
seq__8481_8528 = G__8545;
chunk__8482_8529 = G__8546;
count__8483_8530 = G__8547;
i__8484_8531 = G__8548;
continue;
}
}
} else
{}
}
break;
}
return lt.object.merge_BANG_.call(null,main,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("lt.plugins.clojure.instarepl","widgets","lt.plugins.clojure.instarepl/widgets",653819200),cljs.core.doall.call(null,(function (){var iter__7469__auto__ = (function iter__8485(s__8486){return (new cljs.core.LazySeq(null,(function (){var s__8486__$1 = s__8486;while(true){
var temp__4092__auto__ = cljs.core.seq.call(null,s__8486__$1);if(temp__4092__auto__)
{var s__8486__$2 = temp__4092__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,s__8486__$2))
{var c__7467__auto__ = cljs.core.chunk_first.call(null,s__8486__$2);var size__7468__auto__ = cljs.core.count.call(null,c__7467__auto__);var b__8488 = cljs.core.chunk_buffer.call(null,size__7468__auto__);if((function (){var i__8487 = 0;while(true){
if((i__8487 < size__7468__auto__))
{var r = cljs.core._nth.call(null,c__7467__auto__,i__8487);var vec__8491 = lt.plugins.clojure.instarepl.__GT_type_BAR_val.call(null,r,vs);var type = cljs.core.nth.call(null,vec__8491,0,null);var val = cljs.core.nth.call(null,vec__8491,1,null);cljs.core.chunk_append.call(null,b__8488,lt.plugins.clojure.instarepl.inline.call(null,main,val,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1017479852),type,new cljs.core.Keyword(null,"line","line",1017226086),(cljs.core.first.call(null,new cljs.core.Keyword(null,"cur","cur",1014003122).cljs$core$IFn$_invoke$arity$1(r)) - 1)], null)));
{
var G__8549 = (i__8487 + 1);
i__8487 = G__8549;
continue;
}
} else
{return true;
}
break;
}
})())
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__8488),iter__8485.call(null,cljs.core.chunk_rest.call(null,s__8486__$2)));
} else
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__8488),null);
}
} else
{var r = cljs.core.first.call(null,s__8486__$2);var vec__8492 = lt.plugins.clojure.instarepl.__GT_type_BAR_val.call(null,r,vs);var type = cljs.core.nth.call(null,vec__8492,0,null);var val = cljs.core.nth.call(null,vec__8492,1,null);return cljs.core.cons.call(null,lt.plugins.clojure.instarepl.inline.call(null,main,val,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1017479852),type,new cljs.core.Keyword(null,"line","line",1017226086),(cljs.core.first.call(null,new cljs.core.Keyword(null,"cur","cur",1014003122).cljs$core$IFn$_invoke$arity$1(r)) - 1)], null)),iter__8485.call(null,cljs.core.rest.call(null,s__8486__$2)));
}
} else
{return null;
}
break;
}
}),null,null));
});return iter__7469__auto__.call(null,repls);
})())], null));
}));
});
lt.plugins.clojure.instarepl.__BEH__start_content = (function __BEH__start_content(this$,res,content){return content;
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure.instarepl","start-content","lt.plugins.clojure.instarepl/start-content",4699205791),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.instarepl.__BEH__start_content,new cljs.core.Keyword(null,"desc","desc",1016984067),"Instarepl: Set start content",new cljs.core.Keyword(null,"params","params",4313443576),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"label","label",1116631654),"content"], null)], null),new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"start-content+","start-content+",2652166991),null], null), null),new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"user","user",1017503549));
lt.plugins.clojure.instarepl.live_toggle = (function live_toggle(this$){var e__8120__auto__ = crate.core.html.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1017440956),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",1108647146),crate.binding.bound.call(null,this$,(function (p1__8493_SHARP_){return [cljs.core.str("livetoggler "),cljs.core.str((cljs.core.truth_(new cljs.core.Keyword(null,"live","live",1017226334).cljs$core$IFn$_invoke$arity$1(p1__8493_SHARP_))?null:"off"))].join('');
}))], null),"live"], null));var seq__8500_8550 = cljs.core.seq.call(null,cljs.core.partition.call(null,2,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"click","click",1108654330),(function (e){lt.util.dom.prevent.call(null,e);
return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"live.toggle!","live.toggle!",4497782717));
})], null)));var chunk__8501_8551 = null;var count__8502_8552 = 0;var i__8503_8553 = 0;while(true){
if((i__8503_8553 < count__8502_8552))
{var vec__8504_8554 = cljs.core._nth.call(null,chunk__8501_8551,i__8503_8553);var ev__8121__auto___8555 = cljs.core.nth.call(null,vec__8504_8554,0,null);var func__8122__auto___8556 = cljs.core.nth.call(null,vec__8504_8554,1,null);lt.util.dom.on.call(null,e__8120__auto__,ev__8121__auto___8555,func__8122__auto___8556);
{
var G__8557 = seq__8500_8550;
var G__8558 = chunk__8501_8551;
var G__8559 = count__8502_8552;
var G__8560 = (i__8503_8553 + 1);
seq__8500_8550 = G__8557;
chunk__8501_8551 = G__8558;
count__8502_8552 = G__8559;
i__8503_8553 = G__8560;
continue;
}
} else
{var temp__4092__auto___8561 = cljs.core.seq.call(null,seq__8500_8550);if(temp__4092__auto___8561)
{var seq__8500_8562__$1 = temp__4092__auto___8561;if(cljs.core.chunked_seq_QMARK_.call(null,seq__8500_8562__$1))
{var c__7500__auto___8563 = cljs.core.chunk_first.call(null,seq__8500_8562__$1);{
var G__8564 = cljs.core.chunk_rest.call(null,seq__8500_8562__$1);
var G__8565 = c__7500__auto___8563;
var G__8566 = cljs.core.count.call(null,c__7500__auto___8563);
var G__8567 = 0;
seq__8500_8550 = G__8564;
chunk__8501_8551 = G__8565;
count__8502_8552 = G__8566;
i__8503_8553 = G__8567;
continue;
}
} else
{var vec__8505_8568 = cljs.core.first.call(null,seq__8500_8562__$1);var ev__8121__auto___8569 = cljs.core.nth.call(null,vec__8505_8568,0,null);var func__8122__auto___8570 = cljs.core.nth.call(null,vec__8505_8568,1,null);lt.util.dom.on.call(null,e__8120__auto__,ev__8121__auto___8569,func__8122__auto___8570);
{
var G__8571 = cljs.core.next.call(null,seq__8500_8562__$1);
var G__8572 = null;
var G__8573 = 0;
var G__8574 = 0;
seq__8500_8550 = G__8571;
chunk__8501_8551 = G__8572;
count__8502_8552 = G__8573;
i__8503_8553 = G__8574;
continue;
}
}
} else
{}
}
break;
}
return e__8120__auto__;
});
lt.object.object_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure.instarepl","instarepl","lt.plugins.clojure.instarepl/instarepl",1692574563),new cljs.core.Keyword(null,"tags","tags",1017456523),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"instarepl","instarepl",1043123260),null], null), null),new cljs.core.Keyword(null,"name","name",1017277949),"Instarepl",new cljs.core.Keyword(null,"live","live",1017226334),true,new cljs.core.Keyword(null,"init","init",1017141378),(function (this$){var main = lt.object.add_tags.call(null,lt.object.remove_tags.call(null,lt.objs.editor.pool.create.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"mime","mime",1017255846),"text/x-clojure",new cljs.core.Keyword(null,"content","content",1965434859),"",new cljs.core.Keyword(null,"ns","ns",1013907767),"user"], null)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"editor.clj","editor.clj",3751346322)], null)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"editor.clj.instarepl","editor.clj.instarepl",2477999342),new cljs.core.Keyword(null,"editor.transient","editor.transient",3554141883)], null));lt.object.merge_BANG_.call(null,main,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"frame","frame",1111596255),this$], null));
lt.objs.editor.set_val.call(null,main,(function (){var or__6758__auto__ = lt.object.raise_reduce.call(null,main,new cljs.core.Keyword(null,"start-content+","start-content+",2652166991));if(cljs.core.truth_(or__6758__auto__))
{return or__6758__auto__;
} else
{return lt.plugins.clojure.instarepl.default_content;
}
})());
lt.objs.editor.clear_history.call(null,main);
lt.object.merge_BANG_.call(null,main,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"dirty","dirty",1109497668),false,new cljs.core.Keyword(null,"editor.generation","editor.generation",4482163627),lt.objs.editor.__GT_generation.call(null,main)], null));
lt.object.merge_BANG_.call(null,this$,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"main","main",1017248043),main,new cljs.core.Keyword(null,"dirty","dirty",1109497668),false], null));
lt.objs.editor._PLUS_class.call(null,main,new cljs.core.Keyword(null,"main","main",1017248043));
lt.objs.editor.move_cursor.call(null,main,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"line","line",1017226086),10000,new cljs.core.Keyword(null,"ch","ch",1013907415),0], null));
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div#instarepl","div#instarepl",2561476298),lt.plugins.clojure.instarepl.live_toggle.call(null,this$),lt.object.__GT_content.call(null,main),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"p.error","p.error",3043794556),crate.binding.bound.call(null,this$,new cljs.core.Keyword(null,"error","error",1110689146))], null)], null);
}));
lt.plugins.clojure.instarepl.add = (function add(){var instarepl = lt.object.create.call(null,new cljs.core.Keyword("lt.plugins.clojure.instarepl","instarepl","lt.plugins.clojure.instarepl/instarepl",1692574563));lt.objs.tabs.add_BANG_.call(null,instarepl);
lt.objs.tabs.active_BANG_.call(null,instarepl);
return instarepl;
});
lt.objs.sidebar.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"instarepl-current","instarepl-current",1922368232),new cljs.core.Keyword(null,"desc","desc",1016984067),"Instarepl: Make current editor an instarepl",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){var cur = lt.objs.editor.pool.last_active.call(null);var info = new cljs.core.Keyword(null,"info","info",1017141280).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,cur));if(cljs.core.truth_(cur))
{if(!(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"mime","mime",1017255846).cljs$core$IFn$_invoke$arity$1(info),"text/x-clojure")))
{return lt.objs.notifos.set_msg_BANG_.call(null,"Instarepl only works for Clojure",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",1108647146),"error"], null));
} else
{var content = lt.objs.editor.__GT_val.call(null,cur);var dirty = new cljs.core.Keyword(null,"dirty","dirty",1109497668).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,cur));var inst = lt.object.create.call(null,new cljs.core.Keyword("lt.plugins.clojure.instarepl","instarepl","lt.plugins.clojure.instarepl/instarepl",1692574563));var ed = new cljs.core.Keyword(null,"main","main",1017248043).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,inst));lt.object.merge_BANG_.call(null,ed,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"info","info",1017141280),info,new cljs.core.Keyword(null,"widgets","widgets",2354242081),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"dirty","dirty",1109497668),dirty], null));
lt.object.merge_BANG_.call(null,inst,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"name","name",1017277949),new cljs.core.Keyword(null,"name","name",1017277949).cljs$core$IFn$_invoke$arity$1(info),new cljs.core.Keyword(null,"dirty","dirty",1109497668),dirty], null));
lt.object.remove_tags.call(null,ed,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"editor.transient","editor.transient",3554141883)], null));
lt.object.add_tags.call(null,ed,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"editor.file-backed","editor.file-backed",4684256680)], null));
lt.objs.editor.set_val.call(null,ed,content);
lt.object.raise.call(null,cur,new cljs.core.Keyword(null,"close.force","close.force",4409585383));
lt.objs.tabs.add_BANG_.call(null,inst);
return lt.objs.tabs.active_BANG_.call(null,inst);
}
} else
{return null;
}
})], null));
lt.objs.sidebar.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"instarepl","instarepl",1043123260),new cljs.core.Keyword(null,"desc","desc",1016984067),"Instarepl: Open a clojure instarepl",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){lt.objs.metrics.capture_BANG_.call(null,new cljs.core.Keyword(null,"editor.clj.instarepl","editor.clj.instarepl",2477999342));
return lt.plugins.clojure.instarepl.add.call(null);
})], null));
lt.objs.sidebar.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"instarepl.toggle-live","instarepl.toggle-live",2218373139),new cljs.core.Keyword(null,"desc","desc",1016984067),"Instarepl: Toggle live mode",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){var temp__4092__auto__ = lt.objs.editor.pool.last_active.call(null);if(cljs.core.truth_(temp__4092__auto__))
{var ed = temp__4092__auto__;if(cljs.core.truth_(new cljs.core.Keyword(null,"frame","frame",1111596255).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,ed))))
{return lt.object.raise.call(null,new cljs.core.Keyword(null,"frame","frame",1111596255).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,ed)),new cljs.core.Keyword(null,"live.toggle!","live.toggle!",4497782717));
} else
{return null;
}
} else
{return null;
}
})], null));
}

//# sourceMappingURL=clojure_compiled.js.map