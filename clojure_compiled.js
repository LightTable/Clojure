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
lt.plugins.clojure.nrepl.decode = (function decode(client,failed_recently_QMARK_){var buffer = new cljs.core.Keyword(null,"buffer","buffer",3930752946).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,client));var msg = cljs.core.deref.call(null,buffer);var msgs = [];var msg_8744__$1 = msg;while(true){
if((msg_8744__$1.length <= 0))
{cljs.core.reset_BANG_.call(null,buffer,null);
} else
{try{var neue_8745 = lt.util.cljs.js__GT_clj.call(null,lt.plugins.clojure.nrepl.bencode.decode(msg_8744__$1,"utf-8"),new cljs.core.Keyword(null,"keywordize-keys","keywordize-keys",4191781672),true);var pos_8746 = lt.plugins.clojure.nrepl.bencode.decode.position;msgs.push(neue_8745);
if(cljs.core.truth_((function (){var and__6748__auto__ = pos_8746;if(cljs.core.truth_(and__6748__auto__))
{return (pos_8746 >= msg_8744__$1.length);
} else
{return and__6748__auto__;
}
})()))
{cljs.core.reset_BANG_.call(null,buffer,null);
} else
{{
var G__8747 = msg_8744__$1.slice(pos_8746);
msg_8744__$1 = G__8747;
continue;
}
}
}catch (e8727){if((e8727 instanceof global.Error))
{var e_8748 = e8727;cljs.core.reset_BANG_.call(null,failed_recently_QMARK_,true);
cljs.core.reset_BANG_.call(null,buffer,msg_8744__$1);
setTimeout(((function (msg_8744__$1,e_8748){
return (function (){cljs.core.reset_BANG_.call(null,failed_recently_QMARK_,false);
return decode.call(null,client,failed_recently_QMARK_);
});})(msg_8744__$1,e_8748))
,50);
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{throw e8727;
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
lt.plugins.clojure.nrepl.maybe_decode = (function maybe_decode(client,failed_recently_QMARK_,data){cljs.core.swap_BANG_.call(null,new cljs.core.Keyword(null,"buffer","buffer",3930752946).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,client)),(function (p1__8728_SHARP_){if(cljs.core.truth_(p1__8728_SHARP_))
{return lt.plugins.clojure.nrepl.Buffer.Buffer.concat([p1__8728_SHARP_,data]);
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
}catch (e8730){var e_8749 = e8730;lt.objs.console.error.call(null,e_8749);
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
socket.on("data",(function (p1__8731_SHARP_){if(cljs.core.truth_(cljs.core.deref.call(null,client)))
{return lt.plugins.clojure.nrepl.maybe_decode.call(null,client,failed_recently_QMARK_,p1__8731_SHARP_);
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
lt.plugins.clojure.nrepl.__BEH__nrepl_send_BANG_ = (function __BEH__nrepl_send_BANG_(this$,msg){return lt.plugins.clojure.nrepl.send.call(null,this$,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"op","op",1013907795),new cljs.core.Keyword(null,"command","command",1964298941).cljs$core$IFn$_invoke$arity$1(msg),new cljs.core.Keyword(null,"id","id",1013907597),(function (){var or__6760__auto__ = new cljs.core.Keyword(null,"cb","cb",1013907409).cljs$core$IFn$_invoke$arity$1(msg);if(cljs.core.truth_(or__6760__auto__))
{return or__6760__auto__;
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
lt.plugins.clojure.nrepl.__BEH__nrepl_message = (function __BEH__nrepl_message(this$,msg){var op = new cljs.core.Keyword(null,"op","op",1013907795).cljs$core$IFn$_invoke$arity$1(msg);var encoding = new cljs.core.Keyword(null,"encoding","encoding",2725126341).cljs$core$IFn$_invoke$arity$1(msg);var info = (cljs.core.truth_(new cljs.core.Keyword(null,"data","data",1016980252).cljs$core$IFn$_invoke$arity$1(msg))?(function (){var G__8733 = encoding;if(cljs.core._EQ_.call(null,"json",G__8733))
{return JSON.parse(new cljs.core.Keyword(null,"data","data",1016980252).cljs$core$IFn$_invoke$arity$1(msg));
} else
{if(cljs.core._EQ_.call(null,"edn",G__8733))
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
var G__9959 = (i + 1);
var G__9960 = l;
f = G__9959;
l = G__9960;
continue;
}
} else
{if(new cljs.core.Keyword(null,"else","else",1017020587))
{{
var G__9961 = f;
var G__9962 = i;
f = G__9961;
l = G__9962;
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
lt.plugins.clojure.try_connect = (function try_connect(p__9858){var map__9861 = p__9858;var map__9861__$1 = ((cljs.core.seq_QMARK_.call(null,map__9861))?cljs.core.apply.call(null,cljs.core.hash_map,map__9861):map__9861);var info = cljs.core.get.call(null,map__9861__$1,new cljs.core.Keyword(null,"info","info",1017141280));var path = new cljs.core.Keyword(null,"path","path",1017337751).cljs$core$IFn$_invoke$arity$1(info);var map__9862 = (cljs.core.truth_(path)?lt.plugins.clojure.find_project.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"path","path",1017337751),path], null)):null);var map__9862__$1 = ((cljs.core.seq_QMARK_.call(null,map__9862))?cljs.core.apply.call(null,cljs.core.hash_map,map__9862):map__9862);var project_path = cljs.core.get.call(null,map__9862__$1,new cljs.core.Keyword(null,"project-path","project-path",1907176907));if(cljs.core.truth_(project_path))
{return lt.plugins.clojure.check_all.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"path","path",1017337751),path,new cljs.core.Keyword(null,"client","client",3951159101),lt.objs.clients.client_BANG_.call(null,new cljs.core.Keyword(null,"nrepl.client","nrepl.client",4747318638))], null));
} else
{var or__6760__auto__ = lt.objs.clients.by_name.call(null,lt.plugins.clojure.local_name);if(cljs.core.truth_(or__6760__auto__))
{return or__6760__auto__;
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
lt.plugins.clojure.__BEH__on_eval__DOT__custom = (function __BEH__on_eval__DOT__custom(editor,exp,opts){var code = lt.plugins.clojure.fill_placeholders.call(null,editor,exp);var pos = lt.objs.editor.__GT_cursor.call(null,editor);var info = new cljs.core.Keyword(null,"info","info",1017141280).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,editor));var info__$1 = cljs.core.assoc.call(null,info,new cljs.core.Keyword(null,"code","code",1016963423),code,new cljs.core.Keyword(null,"ns","ns",1013907767),(function (){var or__6760__auto__ = new cljs.core.Keyword(null,"ns","ns",1013907767).cljs$core$IFn$_invoke$arity$1(opts);if(cljs.core.truth_(or__6760__auto__))
{return or__6760__auto__;
} else
{return new cljs.core.Keyword(null,"ns","ns",1013907767).cljs$core$IFn$_invoke$arity$1(info);
}
})(),new cljs.core.Keyword(null,"meta","meta",1017252215),new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"start","start",1123661780),new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(lt.objs.editor.__GT_cursor.call(null,editor,"start")),new cljs.core.Keyword(null,"end","end",1014004813),new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(lt.objs.editor.__GT_cursor.call(null,editor,"end")),new cljs.core.Keyword(null,"verbatim","verbatim",3307884968),new cljs.core.Keyword(null,"verbatim","verbatim",3307884968).cljs$core$IFn$_invoke$arity$1(opts),new cljs.core.Keyword(null,"result-type","result-type",4725630556),(function (){var or__6760__auto__ = new cljs.core.Keyword(null,"result-type","result-type",4725630556).cljs$core$IFn$_invoke$arity$1(opts);if(cljs.core.truth_(or__6760__auto__))
{return or__6760__auto__;
} else
{return new cljs.core.Keyword(null,"inline","inline",4124874251);
}
})(),new cljs.core.Keyword(null,"handler","handler",1706707644),(function (){var temp__4090__auto__ = new cljs.core.Keyword(null,"handler","handler",1706707644).cljs$core$IFn$_invoke$arity$1(opts);if(cljs.core.truth_(temp__4090__auto__))
{var handler = temp__4090__auto__;return lt.object.__GT_id.call(null,handler);
} else
{return null;
}
})(),new cljs.core.Keyword(null,"trigger","trigger",4248979754),(function (){var temp__4090__auto__ = new cljs.core.Keyword(null,"trigger","trigger",4248979754).cljs$core$IFn$_invoke$arity$1(opts);if(cljs.core.truth_(temp__4090__auto__))
{var trigger = temp__4090__auto__;return trigger;
} else
{return new cljs.core.Keyword(null,"return","return",4374474914);
}
})()], null));var info__$2 = cljs.core.assoc.call(null,info__$1,new cljs.core.Keyword(null,"print-length","print-length",3960797560),lt.object.raise_reduce.call(null,editor,new cljs.core.Keyword(null,"clojure.print-length+","clojure.print-length+",4366367949),null));return lt.object.raise.call(null,lt.plugins.clojure.clj_lang,new cljs.core.Keyword(null,"eval!","eval!",1110791799),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"origin","origin",4300251800),editor,new cljs.core.Keyword(null,"info","info",1017141280),info__$2], null));
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure","on-eval.custom","lt.plugins.clojure/on-eval.custom",2808954147),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.__BEH__on_eval__DOT__custom,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"eval.custom","eval.custom",3328560245),null], null), null));
lt.plugins.clojure.__BEH__on_code = (function __BEH__on_code(this$,result){return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"exec.cljs!","exec.cljs!",3800101572),result);
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure","on-code","lt.plugins.clojure/on-code",1190320137),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.__BEH__on_code,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"editor.eval.cljs.code","editor.eval.cljs.code",866569770),null], null), null));
lt.plugins.clojure.__BEH__exec__DOT__cljs_BANG_ = (function __BEH__exec__DOT__cljs_BANG_(this$,res){var client = new cljs.core.Keyword(null,"exec","exec",1017031683).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"client","client",3951159101).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)));var path = new cljs.core.Keyword(null,"path","path",1017337751).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"info","info",1017141280).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)));var res__$1 = cljs.core.update_in.call(null,res,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"results","results",2111450984)], null),((function (client,path){
return (function (p1__9863_SHARP_){var iter__7471__auto__ = ((function (client,path){
return (function iter__9868(s__9869){return (new cljs.core.LazySeq(null,((function (client,path){
return (function (){var s__9869__$1 = s__9869;while(true){
var temp__4092__auto__ = cljs.core.seq.call(null,s__9869__$1);if(temp__4092__auto__)
{var s__9869__$2 = temp__4092__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,s__9869__$2))
{var c__7469__auto__ = cljs.core.chunk_first.call(null,s__9869__$2);var size__7470__auto__ = cljs.core.count.call(null,c__7469__auto__);var b__9871 = cljs.core.chunk_buffer.call(null,size__7470__auto__);if((function (){var i__9870 = 0;while(true){
if((i__9870 < size__7470__auto__))
{var r = cljs.core._nth.call(null,c__7469__auto__,i__9870);cljs.core.chunk_append.call(null,b__9871,cljs.core.assoc.call(null,r,new cljs.core.Keyword(null,"code","code",1016963423),lt.objs.eval.append_source_file.call(null,lt.objs.eval.pad.call(null,new cljs.core.Keyword(null,"code","code",1016963423).cljs$core$IFn$_invoke$arity$1(r),(new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(r)) - 1)),path),new cljs.core.Keyword(null,"meta","meta",1017252215),cljs.core.merge.call(null,new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(res),new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(r))));
{
var G__9963 = (i__9870 + 1);
i__9870 = G__9963;
continue;
}
} else
{return true;
}
break;
}
})())
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__9871),iter__9868.call(null,cljs.core.chunk_rest.call(null,s__9869__$2)));
} else
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__9871),null);
}
} else
{var r = cljs.core.first.call(null,s__9869__$2);return cljs.core.cons.call(null,cljs.core.assoc.call(null,r,new cljs.core.Keyword(null,"code","code",1016963423),lt.objs.eval.append_source_file.call(null,lt.objs.eval.pad.call(null,new cljs.core.Keyword(null,"code","code",1016963423).cljs$core$IFn$_invoke$arity$1(r),(new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(r)) - 1)),path),new cljs.core.Keyword(null,"meta","meta",1017252215),cljs.core.merge.call(null,new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(res),new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(r))),iter__9868.call(null,cljs.core.rest.call(null,s__9869__$2)));
}
} else
{return null;
}
break;
}
});})(client,path))
,null,null));
});})(client,path))
;return iter__7471__auto__.call(null,p1__9863_SHARP_);
});})(client,path))
);return lt.objs.clients.send.call(null,lt.objs.eval.get_client_BANG_.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"editor.eval.cljs.exec","editor.eval.cljs.exec",866638030),new cljs.core.Keyword(null,"info","info",1017141280),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"type","type",1017479852),"cljs"], null),new cljs.core.Keyword(null,"key","key",1014010321),new cljs.core.Keyword(null,"exec","exec",1017031683),new cljs.core.Keyword(null,"origin","origin",4300251800),this$], null)),new cljs.core.Keyword(null,"editor.eval.cljs.exec","editor.eval.cljs.exec",866638030),res__$1,new cljs.core.Keyword(null,"only","only",1017320222),this$);
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure","exec.cljs!","lt.plugins.clojure/exec.cljs!",1322475104),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.__BEH__exec__DOT__cljs_BANG_,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"exec.cljs!","exec.cljs!",3800101572),null], null), null));
lt.plugins.clojure.mime__GT_type = new cljs.core.PersistentArrayMap(null, 2, ["text/x-clojure","clj","text/x-clojurescript","cljs"], null);
lt.plugins.clojure.__BEH__eval_BANG_ = (function __BEH__eval_BANG_(this$,event){var map__9873 = event;var map__9873__$1 = ((cljs.core.seq_QMARK_.call(null,map__9873))?cljs.core.apply.call(null,cljs.core.hash_map,map__9873):map__9873);var origin = cljs.core.get.call(null,map__9873__$1,new cljs.core.Keyword(null,"origin","origin",4300251800));var info = cljs.core.get.call(null,map__9873__$1,new cljs.core.Keyword(null,"info","info",1017141280));var command = lt.util.cljs.__GT_dottedkw.call(null,new cljs.core.Keyword(null,"editor.eval","editor.eval",4270299119),lt.plugins.clojure.mime__GT_type.call(null,new cljs.core.Keyword(null,"mime","mime",1017255846).cljs$core$IFn$_invoke$arity$1(info)));var client = new cljs.core.Keyword(null,"default","default",2558708147).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"client","client",3951159101).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,origin)));lt.objs.notifos.working.call(null);
return lt.objs.clients.send.call(null,lt.objs.eval.get_client_BANG_.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",1964298941),command,new cljs.core.Keyword(null,"info","info",1017141280),info,new cljs.core.Keyword(null,"origin","origin",4300251800),origin,new cljs.core.Keyword(null,"create","create",3956577390),lt.plugins.clojure.try_connect], null)),command,info,new cljs.core.Keyword(null,"only","only",1017320222),origin);
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure","eval!","lt.plugins.clojure/eval!",1863154227),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.__BEH__eval_BANG_,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"eval!","eval!",1110791799),null], null), null));
lt.plugins.clojure.__BEH__build_BANG_ = (function __BEH__build_BANG_(this$,event){var map__9875 = event;var map__9875__$1 = ((cljs.core.seq_QMARK_.call(null,map__9875))?cljs.core.apply.call(null,cljs.core.hash_map,map__9875):map__9875);var origin = cljs.core.get.call(null,map__9875__$1,new cljs.core.Keyword(null,"origin","origin",4300251800));var info = cljs.core.get.call(null,map__9875__$1,new cljs.core.Keyword(null,"info","info",1017141280));var command = lt.util.cljs.__GT_dottedkw.call(null,lt.plugins.clojure.mime__GT_type.call(null,new cljs.core.Keyword(null,"mime","mime",1017255846).cljs$core$IFn$_invoke$arity$1(info)),"compile");lt.objs.notifos.working.call(null,"Starting build");
return lt.objs.clients.send.call(null,lt.objs.eval.get_client_BANG_.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",1964298941),command,new cljs.core.Keyword(null,"info","info",1017141280),info,new cljs.core.Keyword(null,"origin","origin",4300251800),origin,new cljs.core.Keyword(null,"create","create",3956577390),lt.plugins.clojure.try_connect], null)),command,info,new cljs.core.Keyword(null,"only","only",1017320222),origin);
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure","build!","lt.plugins.clojure/build!",1190684225),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.__BEH__build_BANG_,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"build!","build!",3930847973),null], null), null));
lt.plugins.clojure.__BEH__build_cljs_plugin = (function __BEH__build_cljs_plugin(this$,opts){var to_compile = lt.objs.files.filter_walk.call(null,(function (p1__9876_SHARP_){return cljs.core._EQ_.call(null,lt.objs.files.ext.call(null,p1__9876_SHARP_),"cljs");
}),lt.objs.files.join.call(null,new cljs.core.Keyword("lt.objs.plugins","plugin-path","lt.objs.plugins/plugin-path",2063828362).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)),"src"));return lt.object.raise.call(null,lt.plugins.clojure.clj_lang,new cljs.core.Keyword(null,"build!","build!",3930847973),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"info","info",1017141280),new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"files","files",1111338473),to_compile,new cljs.core.Keyword(null,"mime","mime",1017255846),new cljs.core.Keyword(null,"mime","mime",1017255846).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"info","info",1017141280).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$))),new cljs.core.Keyword(null,"dir","dir",1014003711),new cljs.core.Keyword("lt.objs.plugins","plugin-path","lt.objs.plugins/plugin-path",2063828362).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)),new cljs.core.Keyword(null,"path","path",1017337751),lt.objs.files.join.call(null,new cljs.core.Keyword("lt.objs.plugins","plugin-path","lt.objs.plugins/plugin-path",2063828362).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)),"plugin.edn"),new cljs.core.Keyword(null,"ignore","ignore",4118475076),new cljs.core.PersistentVector(null, 16, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"goog","goog",-1637352839,null),new cljs.core.Symbol(null,"goog.array","goog.array",-658519708,null),new cljs.core.Symbol(null,"lt.object","lt.object",-2122453986,null),new cljs.core.Symbol(null,"crate.core","crate.core",550297763,null),new cljs.core.Symbol(null,"crate.util","crate.util",550838534,null),new cljs.core.Symbol(null,"lt.util.load","lt.util.load",2092978213,null),new cljs.core.Symbol(null,"lt.util.cljs","lt.util.cljs",2092707505,null),new cljs.core.Symbol(null,"lt.util.dom","lt.util.dom",-273177419,null),new cljs.core.Symbol(null,"lt.util.js","lt.util.js",2144354824,null),new cljs.core.Symbol(null,"fetch.core","fetch.core",-1380286452,null),new cljs.core.Symbol(null,"fetch.util","fetch.util",-1379745681,null),new cljs.core.Symbol(null,"cljs.core","cljs.core",1979061844,null),new cljs.core.Symbol(null,"cljs.reader","cljs.reader",-1715113864,null),new cljs.core.Symbol(null,"clojure.string","clojure.string",-2028944364,null),new cljs.core.Symbol(null,"clojure.set","clojure.set",-2081128431,null),new cljs.core.Symbol(null,"goog.string","goog.string",-745757000,null)], null),new cljs.core.Keyword(null,"merge?","merge?",4231255673),true], null),new cljs.core.Keyword(null,"origin","origin",4300251800),this$], null));
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure","build-cljs-plugin","lt.plugins.clojure/build-cljs-plugin",4539349021),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.__BEH__build_cljs_plugin,new cljs.core.Keyword(null,"desc","desc",1016984067),"Plugin: build ClojureScript plugin",new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"build","build",1107999200),null], null), null));
lt.plugins.clojure.__BEH__plugin_compile_results = (function __BEH__plugin_compile_results(this$,res){var plugin_name = clojure.string.lower_case.call(null,new cljs.core.Keyword(null,"name","name",1017277949).cljs$core$IFn$_invoke$arity$1(lt.objs.plugins.plugin_info.call(null,new cljs.core.Keyword("lt.objs.plugins","plugin-path","lt.objs.plugins/plugin-path",2063828362).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)))));var final_path = lt.objs.files.join.call(null,new cljs.core.Keyword("lt.objs.plugins","plugin-path","lt.objs.plugins/plugin-path",2063828362).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)),[cljs.core.str(plugin_name),cljs.core.str("_compiled.js")].join(''));var plugin_map_name = [cljs.core.str(plugin_name),cljs.core.str("_compiled.js.map")].join('');var sm_path = lt.objs.files.join.call(null,new cljs.core.Keyword("lt.objs.plugins","plugin-path","lt.objs.plugins/plugin-path",2063828362).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)),plugin_map_name);lt.objs.notifos.done_working.call(null,[cljs.core.str("Compiled plugin to "),cljs.core.str(final_path)].join(''));
lt.objs.files.save.call(null,final_path,[cljs.core.str(new cljs.core.Keyword(null,"js","js",1013907643).cljs$core$IFn$_invoke$arity$1(res)),cljs.core.str("\n//# sourceMappingURL="),cljs.core.str(plugin_map_name)].join(''));
return lt.objs.files.save.call(null,sm_path,new cljs.core.Keyword(null,"source-map","source-map",4196266012).cljs$core$IFn$_invoke$arity$1(res));
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure","plugin-compile-results","lt.plugins.clojure/plugin-compile-results",4522483440),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.__BEH__plugin_compile_results,new cljs.core.Keyword(null,"desc","desc",1016984067),"Plugin: output compile results",new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"cljs.compile.results","cljs.compile.results",3808629809),null], null), null));
lt.plugins.clojure.__BEH__on_result_set_ns = (function __BEH__on_result_set_ns(obj,res){if(cljs.core.truth_((function (){var and__6748__auto__ = new cljs.core.Keyword(null,"ns","ns",1013907767).cljs$core$IFn$_invoke$arity$1(res);if(cljs.core.truth_(and__6748__auto__))
{return cljs.core.not_EQ_.call(null,new cljs.core.Keyword(null,"ns","ns",1013907767).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"info","info",1017141280).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,obj))),new cljs.core.Keyword(null,"ns","ns",1013907767).cljs$core$IFn$_invoke$arity$1(res));
} else
{return and__6748__auto__;
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
var type = (function (){var or__6760__auto__ = new cljs.core.Keyword(null,"result-type","result-type",4725630556).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(res));if(cljs.core.truth_(or__6760__auto__))
{return or__6760__auto__;
} else
{return new cljs.core.Keyword(null,"inline","inline",4124874251);
}
})();var ev = lt.util.cljs.__GT_dottedkw.call(null,new cljs.core.Keyword(null,"editor.eval.cljs.result","editor.eval.cljs.result",1580065178),type);return lt.object.raise.call(null,obj,ev,res);
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure","cljs-result","lt.plugins.clojure/cljs-result",779436518),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.__BEH__cljs_result,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"editor.eval.cljs.result","editor.eval.cljs.result",1580065178),null], null), null));
lt.plugins.clojure.__BEH__cljs_result__DOT__replace = (function __BEH__cljs_result__DOT__replace(obj,res){var temp__4090__auto__ = (function (){var or__6760__auto__ = new cljs.core.Keyword(null,"stack","stack",1123661306).cljs$core$IFn$_invoke$arity$1(res);if(cljs.core.truth_(or__6760__auto__))
{return or__6760__auto__;
} else
{return new cljs.core.Keyword(null,"ex","ex",1013907493).cljs$core$IFn$_invoke$arity$1(res);
}
})();if(cljs.core.truth_(temp__4090__auto__))
{var err = temp__4090__auto__;return lt.objs.notifos.set_msg_BANG_.call(null,err,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",1108647146),"error"], null));
} else
{return lt.objs.editor.replace_selection.call(null,obj,lt.plugins.clojure.unescape_unicode.call(null,(function (){var or__6760__auto__ = new cljs.core.Keyword(null,"result","result",4374444943).cljs$core$IFn$_invoke$arity$1(res);if(cljs.core.truth_(or__6760__auto__))
{return or__6760__auto__;
} else
{return "";
}
})()));
}
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure","cljs-result.replace","lt.plugins.clojure/cljs-result.replace",2659047564),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.__BEH__cljs_result__DOT__replace,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"editor.eval.cljs.result.replace","editor.eval.cljs.result.replace",1975778400),null], null), null));
lt.plugins.clojure.__BEH__cljs_result__DOT__statusbar = (function __BEH__cljs_result__DOT__statusbar(obj,res){var temp__4090__auto__ = (function (){var or__6760__auto__ = new cljs.core.Keyword(null,"stack","stack",1123661306).cljs$core$IFn$_invoke$arity$1(res);if(cljs.core.truth_(or__6760__auto__))
{return or__6760__auto__;
} else
{return new cljs.core.Keyword(null,"ex","ex",1013907493).cljs$core$IFn$_invoke$arity$1(res);
}
})();if(cljs.core.truth_(temp__4090__auto__))
{var err = temp__4090__auto__;return lt.objs.notifos.set_msg_BANG_.call(null,err,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",1108647146),"error"], null));
} else
{return lt.objs.notifos.set_msg_BANG_.call(null,lt.plugins.clojure.unescape_unicode.call(null,(function (){var or__6760__auto__ = new cljs.core.Keyword(null,"result","result",4374444943).cljs$core$IFn$_invoke$arity$1(res);if(cljs.core.truth_(or__6760__auto__))
{return or__6760__auto__;
} else
{return "";
}
})()),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",1108647146),"result"], null));
}
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure","cljs-result.statusbar","lt.plugins.clojure/cljs-result.statusbar",1141718617),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.__BEH__cljs_result__DOT__statusbar,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"editor.eval.cljs.result.statusbar","editor.eval.cljs.result.statusbar",4637192717),null], null), null));
lt.plugins.clojure.__BEH__cljs_result__DOT__inline = (function __BEH__cljs_result__DOT__inline(obj,res){var meta = new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(res);var loc = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",1017226086),(new cljs.core.Keyword(null,"end-line","end-line",2693041432).cljs$core$IFn$_invoke$arity$1(meta) - 1),new cljs.core.Keyword(null,"ch","ch",1013907415),new cljs.core.Keyword(null,"end-column","end-column",3799845882).cljs$core$IFn$_invoke$arity$1(meta),new cljs.core.Keyword(null,"start-line","start-line",3689311729),(new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(meta) - 1)], null);var temp__4090__auto__ = (function (){var or__6760__auto__ = new cljs.core.Keyword(null,"stack","stack",1123661306).cljs$core$IFn$_invoke$arity$1(res);if(cljs.core.truth_(or__6760__auto__))
{return or__6760__auto__;
} else
{return new cljs.core.Keyword(null,"ex","ex",1013907493).cljs$core$IFn$_invoke$arity$1(res);
}
})();if(cljs.core.truth_(temp__4090__auto__))
{var err = temp__4090__auto__;return lt.object.raise.call(null,obj,new cljs.core.Keyword(null,"editor.eval.cljs.exception","editor.eval.cljs.exception",4479049174),res,new cljs.core.Keyword(null,"passed","passed",4313490402));
} else
{return lt.object.raise.call(null,obj,new cljs.core.Keyword(null,"editor.result","editor.result",4030217008),lt.plugins.clojure.unescape_unicode.call(null,(function (){var or__6760__auto__ = new cljs.core.Keyword(null,"result","result",4374444943).cljs$core$IFn$_invoke$arity$1(res);if(cljs.core.truth_(or__6760__auto__))
{return or__6760__auto__;
} else
{return "";
}
})()),loc);
}
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure","cljs-result.inline","lt.plugins.clojure/cljs-result.inline",3718133053),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.__BEH__cljs_result__DOT__inline,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"editor.eval.cljs.result.inline","editor.eval.cljs.result.inline",4674785425),null], null), null));
lt.plugins.clojure.__BEH__cljs_result__DOT__inline_at_cursor = (function __BEH__cljs_result__DOT__inline_at_cursor(obj,res){var meta = new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(res);var loc = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"line","line",1017226086),new cljs.core.Keyword(null,"start","start",1123661780).cljs$core$IFn$_invoke$arity$1(meta),new cljs.core.Keyword(null,"start-line","start-line",3689311729),new cljs.core.Keyword(null,"start","start",1123661780).cljs$core$IFn$_invoke$arity$1(meta)], null);var temp__4090__auto__ = (function (){var or__6760__auto__ = new cljs.core.Keyword(null,"stack","stack",1123661306).cljs$core$IFn$_invoke$arity$1(res);if(cljs.core.truth_(or__6760__auto__))
{return or__6760__auto__;
} else
{return new cljs.core.Keyword(null,"ex","ex",1013907493).cljs$core$IFn$_invoke$arity$1(res);
}
})();if(cljs.core.truth_(temp__4090__auto__))
{var err = temp__4090__auto__;return lt.object.raise.call(null,obj,new cljs.core.Keyword(null,"editor.eval.cljs.exception","editor.eval.cljs.exception",4479049174),res,new cljs.core.Keyword(null,"passed","passed",4313490402));
} else
{return lt.object.raise.call(null,obj,new cljs.core.Keyword(null,"editor.result","editor.result",4030217008),lt.plugins.clojure.unescape_unicode.call(null,(function (){var or__6760__auto__ = new cljs.core.Keyword(null,"result","result",4374444943).cljs$core$IFn$_invoke$arity$1(res);if(cljs.core.truth_(or__6760__auto__))
{return or__6760__auto__;
} else
{return "";
}
})()),loc);
}
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure","cljs-result.inline-at-cursor","lt.plugins.clojure/cljs-result.inline-at-cursor",3375816544),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.__BEH__cljs_result__DOT__inline_at_cursor,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"editor.eval.cljs.result.inline-at-cursor","editor.eval.cljs.result.inline-at-cursor",1541585524),null], null), null));
lt.plugins.clojure.__BEH__cljs_result__DOT__return = (function __BEH__cljs_result__DOT__return(obj,res){var meta = new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(res);var handler = lt.object.by_id.call(null,new cljs.core.Keyword(null,"handler","handler",1706707644).cljs$core$IFn$_invoke$arity$1(meta));var ev = new cljs.core.Keyword(null,"trigger","trigger",4248979754).cljs$core$IFn$_invoke$arity$1(meta);var loc = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"start","start",1123661780),new cljs.core.Keyword(null,"start","start",1123661780).cljs$core$IFn$_invoke$arity$1(meta),new cljs.core.Keyword(null,"end","end",1014004813),new cljs.core.Keyword(null,"end","end",1014004813).cljs$core$IFn$_invoke$arity$1(meta)], null);var temp__4090__auto__ = (function (){var or__6760__auto__ = new cljs.core.Keyword(null,"stack","stack",1123661306).cljs$core$IFn$_invoke$arity$1(res);if(cljs.core.truth_(or__6760__auto__))
{return or__6760__auto__;
} else
{return new cljs.core.Keyword(null,"ex","ex",1013907493).cljs$core$IFn$_invoke$arity$1(res);
}
})();if(cljs.core.truth_(temp__4090__auto__))
{var err = temp__4090__auto__;return lt.object.raise.call(null,obj,new cljs.core.Keyword(null,"editor.eval.cljs.exception","editor.eval.cljs.exception",4479049174),res,new cljs.core.Keyword(null,"passed","passed",4313490402));
} else
{return lt.object.raise.call(null,handler,ev,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"result","result",4374444943),lt.plugins.clojure.unescape_unicode.call(null,(function (){var or__6760__auto__ = new cljs.core.Keyword(null,"result","result",4374444943).cljs$core$IFn$_invoke$arity$1(res);if(cljs.core.truth_(or__6760__auto__))
{return or__6760__auto__;
} else
{return "";
}
})()),new cljs.core.Keyword(null,"loc","loc",1014011570),loc], null));
}
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure","cljs-result.return","lt.plugins.clojure/cljs-result.return",3430717492),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.__BEH__cljs_result__DOT__return,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"editor.eval.cljs.result.return","editor.eval.cljs.result.return",629418792),null], null), null));
lt.plugins.clojure.__BEH__clj_result = (function __BEH__clj_result(obj,res){lt.objs.notifos.done_working.call(null);
var type = (function (){var or__6760__auto__ = new cljs.core.Keyword(null,"result-type","result-type",4725630556).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(res));if(cljs.core.truth_(or__6760__auto__))
{return or__6760__auto__;
} else
{return new cljs.core.Keyword(null,"inline","inline",4124874251);
}
})();var ev = lt.util.cljs.__GT_dottedkw.call(null,new cljs.core.Keyword(null,"editor.eval.clj.result","editor.eval.clj.result",1582056205),type);return lt.object.raise.call(null,obj,ev,res);
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure","clj-result","lt.plugins.clojure/clj-result",1703646583),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.__BEH__clj_result,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"editor.eval.clj.result","editor.eval.clj.result",1582056205),null], null), null));
lt.plugins.clojure.__BEH__clj_result__DOT__replace = (function __BEH__clj_result__DOT__replace(obj,res){var seq__9883 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"results","results",2111450984).cljs$core$IFn$_invoke$arity$1(res));var chunk__9885 = null;var count__9886 = 0;var i__9887 = 0;while(true){
if((i__9887 < count__9886))
{var result = cljs.core._nth.call(null,chunk__9885,i__9887);var meta_9964 = new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(result);var loc_9965 = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",1017226086),(new cljs.core.Keyword(null,"end-line","end-line",2693041432).cljs$core$IFn$_invoke$arity$1(meta_9964) - 1),new cljs.core.Keyword(null,"ch","ch",1013907415),new cljs.core.Keyword(null,"end-column","end-column",3799845882).cljs$core$IFn$_invoke$arity$1(meta_9964),new cljs.core.Keyword(null,"start-line","start-line",3689311729),(new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(meta_9964) - 1)], null);if(cljs.core.truth_(new cljs.core.Keyword(null,"stack","stack",1123661306).cljs$core$IFn$_invoke$arity$1(result)))
{lt.objs.notifos.set_msg_BANG_.call(null,new cljs.core.Keyword(null,"result","result",4374444943).cljs$core$IFn$_invoke$arity$1(res),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",1108647146),"error"], null));
} else
{lt.objs.editor.replace_selection.call(null,obj,new cljs.core.Keyword(null,"result","result",4374444943).cljs$core$IFn$_invoke$arity$1(result));
}
{
var G__9966 = seq__9883;
var G__9967 = chunk__9885;
var G__9968 = count__9886;
var G__9969 = (i__9887 + 1);
seq__9883 = G__9966;
chunk__9885 = G__9967;
count__9886 = G__9968;
i__9887 = G__9969;
continue;
}
} else
{var temp__4092__auto__ = cljs.core.seq.call(null,seq__9883);if(temp__4092__auto__)
{var seq__9883__$1 = temp__4092__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,seq__9883__$1))
{var c__7502__auto__ = cljs.core.chunk_first.call(null,seq__9883__$1);{
var G__9970 = cljs.core.chunk_rest.call(null,seq__9883__$1);
var G__9971 = c__7502__auto__;
var G__9972 = cljs.core.count.call(null,c__7502__auto__);
var G__9973 = 0;
seq__9883 = G__9970;
chunk__9885 = G__9971;
count__9886 = G__9972;
i__9887 = G__9973;
continue;
}
} else
{var result = cljs.core.first.call(null,seq__9883__$1);var meta_9974 = new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(result);var loc_9975 = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",1017226086),(new cljs.core.Keyword(null,"end-line","end-line",2693041432).cljs$core$IFn$_invoke$arity$1(meta_9974) - 1),new cljs.core.Keyword(null,"ch","ch",1013907415),new cljs.core.Keyword(null,"end-column","end-column",3799845882).cljs$core$IFn$_invoke$arity$1(meta_9974),new cljs.core.Keyword(null,"start-line","start-line",3689311729),(new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(meta_9974) - 1)], null);if(cljs.core.truth_(new cljs.core.Keyword(null,"stack","stack",1123661306).cljs$core$IFn$_invoke$arity$1(result)))
{lt.objs.notifos.set_msg_BANG_.call(null,new cljs.core.Keyword(null,"result","result",4374444943).cljs$core$IFn$_invoke$arity$1(res),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",1108647146),"error"], null));
} else
{lt.objs.editor.replace_selection.call(null,obj,new cljs.core.Keyword(null,"result","result",4374444943).cljs$core$IFn$_invoke$arity$1(result));
}
{
var G__9976 = cljs.core.next.call(null,seq__9883__$1);
var G__9977 = null;
var G__9978 = 0;
var G__9979 = 0;
seq__9883 = G__9976;
chunk__9885 = G__9977;
count__9886 = G__9978;
i__9887 = G__9979;
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
lt.plugins.clojure.__BEH__clj_result__DOT__statusbar = (function __BEH__clj_result__DOT__statusbar(obj,res){var seq__9895 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"results","results",2111450984).cljs$core$IFn$_invoke$arity$1(res));var chunk__9897 = null;var count__9898 = 0;var i__9899 = 0;while(true){
if((i__9899 < count__9898))
{var result = cljs.core._nth.call(null,chunk__9897,i__9899);var meta_9980 = new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(result);var loc_9981 = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",1017226086),(new cljs.core.Keyword(null,"end-line","end-line",2693041432).cljs$core$IFn$_invoke$arity$1(meta_9980) - 1),new cljs.core.Keyword(null,"ch","ch",1013907415),new cljs.core.Keyword(null,"end-column","end-column",3799845882).cljs$core$IFn$_invoke$arity$1(meta_9980),new cljs.core.Keyword(null,"start-line","start-line",3689311729),(new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(meta_9980) - 1)], null);if(cljs.core.truth_(new cljs.core.Keyword(null,"stack","stack",1123661306).cljs$core$IFn$_invoke$arity$1(result)))
{lt.objs.notifos.set_msg_BANG_.call(null,new cljs.core.Keyword(null,"result","result",4374444943).cljs$core$IFn$_invoke$arity$1(res),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",1108647146),"error"], null));
} else
{lt.objs.notifos.set_msg_BANG_.call(null,new cljs.core.Keyword(null,"result","result",4374444943).cljs$core$IFn$_invoke$arity$1(result),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",1108647146),"result"], null));
}
{
var G__9982 = seq__9895;
var G__9983 = chunk__9897;
var G__9984 = count__9898;
var G__9985 = (i__9899 + 1);
seq__9895 = G__9982;
chunk__9897 = G__9983;
count__9898 = G__9984;
i__9899 = G__9985;
continue;
}
} else
{var temp__4092__auto__ = cljs.core.seq.call(null,seq__9895);if(temp__4092__auto__)
{var seq__9895__$1 = temp__4092__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,seq__9895__$1))
{var c__7502__auto__ = cljs.core.chunk_first.call(null,seq__9895__$1);{
var G__9986 = cljs.core.chunk_rest.call(null,seq__9895__$1);
var G__9987 = c__7502__auto__;
var G__9988 = cljs.core.count.call(null,c__7502__auto__);
var G__9989 = 0;
seq__9895 = G__9986;
chunk__9897 = G__9987;
count__9898 = G__9988;
i__9899 = G__9989;
continue;
}
} else
{var result = cljs.core.first.call(null,seq__9895__$1);var meta_9990 = new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(result);var loc_9991 = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",1017226086),(new cljs.core.Keyword(null,"end-line","end-line",2693041432).cljs$core$IFn$_invoke$arity$1(meta_9990) - 1),new cljs.core.Keyword(null,"ch","ch",1013907415),new cljs.core.Keyword(null,"end-column","end-column",3799845882).cljs$core$IFn$_invoke$arity$1(meta_9990),new cljs.core.Keyword(null,"start-line","start-line",3689311729),(new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(meta_9990) - 1)], null);if(cljs.core.truth_(new cljs.core.Keyword(null,"stack","stack",1123661306).cljs$core$IFn$_invoke$arity$1(result)))
{lt.objs.notifos.set_msg_BANG_.call(null,new cljs.core.Keyword(null,"result","result",4374444943).cljs$core$IFn$_invoke$arity$1(res),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",1108647146),"error"], null));
} else
{lt.objs.notifos.set_msg_BANG_.call(null,new cljs.core.Keyword(null,"result","result",4374444943).cljs$core$IFn$_invoke$arity$1(result),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",1108647146),"result"], null));
}
{
var G__9992 = cljs.core.next.call(null,seq__9895__$1);
var G__9993 = null;
var G__9994 = 0;
var G__9995 = 0;
seq__9895 = G__9992;
chunk__9897 = G__9993;
count__9898 = G__9994;
i__9899 = G__9995;
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
lt.plugins.clojure.__BEH__clj_result__DOT__inline = (function __BEH__clj_result__DOT__inline(obj,res){var seq__9907 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"results","results",2111450984).cljs$core$IFn$_invoke$arity$1(res));var chunk__9909 = null;var count__9910 = 0;var i__9911 = 0;while(true){
if((i__9911 < count__9910))
{var result = cljs.core._nth.call(null,chunk__9909,i__9911);var meta_9996 = new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(result);var loc_9997 = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",1017226086),(new cljs.core.Keyword(null,"end-line","end-line",2693041432).cljs$core$IFn$_invoke$arity$1(meta_9996) - 1),new cljs.core.Keyword(null,"ch","ch",1013907415),new cljs.core.Keyword(null,"end-column","end-column",3799845882).cljs$core$IFn$_invoke$arity$1(meta_9996),new cljs.core.Keyword(null,"start-line","start-line",3689311729),(new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(meta_9996) - 1)], null);if(cljs.core.truth_(new cljs.core.Keyword(null,"stack","stack",1123661306).cljs$core$IFn$_invoke$arity$1(result)))
{lt.object.raise.call(null,obj,new cljs.core.Keyword(null,"editor.eval.clj.exception","editor.eval.clj.exception",3664192387),result,new cljs.core.Keyword(null,"passed","passed",4313490402));
} else
{lt.object.raise.call(null,obj,new cljs.core.Keyword(null,"editor.result","editor.result",4030217008),new cljs.core.Keyword(null,"result","result",4374444943).cljs$core$IFn$_invoke$arity$1(result),loc_9997);
}
{
var G__9998 = seq__9907;
var G__9999 = chunk__9909;
var G__10000 = count__9910;
var G__10001 = (i__9911 + 1);
seq__9907 = G__9998;
chunk__9909 = G__9999;
count__9910 = G__10000;
i__9911 = G__10001;
continue;
}
} else
{var temp__4092__auto__ = cljs.core.seq.call(null,seq__9907);if(temp__4092__auto__)
{var seq__9907__$1 = temp__4092__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,seq__9907__$1))
{var c__7502__auto__ = cljs.core.chunk_first.call(null,seq__9907__$1);{
var G__10002 = cljs.core.chunk_rest.call(null,seq__9907__$1);
var G__10003 = c__7502__auto__;
var G__10004 = cljs.core.count.call(null,c__7502__auto__);
var G__10005 = 0;
seq__9907 = G__10002;
chunk__9909 = G__10003;
count__9910 = G__10004;
i__9911 = G__10005;
continue;
}
} else
{var result = cljs.core.first.call(null,seq__9907__$1);var meta_10006 = new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(result);var loc_10007 = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",1017226086),(new cljs.core.Keyword(null,"end-line","end-line",2693041432).cljs$core$IFn$_invoke$arity$1(meta_10006) - 1),new cljs.core.Keyword(null,"ch","ch",1013907415),new cljs.core.Keyword(null,"end-column","end-column",3799845882).cljs$core$IFn$_invoke$arity$1(meta_10006),new cljs.core.Keyword(null,"start-line","start-line",3689311729),(new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(meta_10006) - 1)], null);if(cljs.core.truth_(new cljs.core.Keyword(null,"stack","stack",1123661306).cljs$core$IFn$_invoke$arity$1(result)))
{lt.object.raise.call(null,obj,new cljs.core.Keyword(null,"editor.eval.clj.exception","editor.eval.clj.exception",3664192387),result,new cljs.core.Keyword(null,"passed","passed",4313490402));
} else
{lt.object.raise.call(null,obj,new cljs.core.Keyword(null,"editor.result","editor.result",4030217008),new cljs.core.Keyword(null,"result","result",4374444943).cljs$core$IFn$_invoke$arity$1(result),loc_10007);
}
{
var G__10008 = cljs.core.next.call(null,seq__9907__$1);
var G__10009 = null;
var G__10010 = 0;
var G__10011 = 0;
seq__9907 = G__10008;
chunk__9909 = G__10009;
count__9910 = G__10010;
i__9911 = G__10011;
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
lt.plugins.clojure.__BEH__clj_result__DOT__inline_at_cursor = (function __BEH__clj_result__DOT__inline_at_cursor(obj,res){var seq__9919 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"results","results",2111450984).cljs$core$IFn$_invoke$arity$1(res));var chunk__9921 = null;var count__9922 = 0;var i__9923 = 0;while(true){
if((i__9923 < count__9922))
{var result = cljs.core._nth.call(null,chunk__9921,i__9923);var meta_10012 = new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(result);var loc_10013 = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"line","line",1017226086),new cljs.core.Keyword(null,"start","start",1123661780).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(res)),new cljs.core.Keyword(null,"start-line","start-line",3689311729),new cljs.core.Keyword(null,"start","start",1123661780).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(res))], null);if(cljs.core.truth_(new cljs.core.Keyword(null,"stack","stack",1123661306).cljs$core$IFn$_invoke$arity$1(result)))
{lt.object.raise.call(null,obj,new cljs.core.Keyword(null,"editor.eval.clj.exception","editor.eval.clj.exception",3664192387),result,new cljs.core.Keyword(null,"passed","passed",4313490402));
} else
{lt.object.raise.call(null,obj,new cljs.core.Keyword(null,"editor.result","editor.result",4030217008),new cljs.core.Keyword(null,"result","result",4374444943).cljs$core$IFn$_invoke$arity$1(result),loc_10013);
}
{
var G__10014 = seq__9919;
var G__10015 = chunk__9921;
var G__10016 = count__9922;
var G__10017 = (i__9923 + 1);
seq__9919 = G__10014;
chunk__9921 = G__10015;
count__9922 = G__10016;
i__9923 = G__10017;
continue;
}
} else
{var temp__4092__auto__ = cljs.core.seq.call(null,seq__9919);if(temp__4092__auto__)
{var seq__9919__$1 = temp__4092__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,seq__9919__$1))
{var c__7502__auto__ = cljs.core.chunk_first.call(null,seq__9919__$1);{
var G__10018 = cljs.core.chunk_rest.call(null,seq__9919__$1);
var G__10019 = c__7502__auto__;
var G__10020 = cljs.core.count.call(null,c__7502__auto__);
var G__10021 = 0;
seq__9919 = G__10018;
chunk__9921 = G__10019;
count__9922 = G__10020;
i__9923 = G__10021;
continue;
}
} else
{var result = cljs.core.first.call(null,seq__9919__$1);var meta_10022 = new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(result);var loc_10023 = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"line","line",1017226086),new cljs.core.Keyword(null,"start","start",1123661780).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(res)),new cljs.core.Keyword(null,"start-line","start-line",3689311729),new cljs.core.Keyword(null,"start","start",1123661780).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(res))], null);if(cljs.core.truth_(new cljs.core.Keyword(null,"stack","stack",1123661306).cljs$core$IFn$_invoke$arity$1(result)))
{lt.object.raise.call(null,obj,new cljs.core.Keyword(null,"editor.eval.clj.exception","editor.eval.clj.exception",3664192387),result,new cljs.core.Keyword(null,"passed","passed",4313490402));
} else
{lt.object.raise.call(null,obj,new cljs.core.Keyword(null,"editor.result","editor.result",4030217008),new cljs.core.Keyword(null,"result","result",4374444943).cljs$core$IFn$_invoke$arity$1(result),loc_10023);
}
{
var G__10024 = cljs.core.next.call(null,seq__9919__$1);
var G__10025 = null;
var G__10026 = 0;
var G__10027 = 0;
seq__9919 = G__10024;
chunk__9921 = G__10025;
count__9922 = G__10026;
i__9923 = G__10027;
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
lt.plugins.clojure.__BEH__clj_result__DOT__return = (function __BEH__clj_result__DOT__return(obj,res){var seq__9931 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"results","results",2111450984).cljs$core$IFn$_invoke$arity$1(res));var chunk__9933 = null;var count__9934 = 0;var i__9935 = 0;while(true){
if((i__9935 < count__9934))
{var result = cljs.core._nth.call(null,chunk__9933,i__9935);var meta_10028 = new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(result);var handler_10029 = lt.object.by_id.call(null,new cljs.core.Keyword(null,"handler","handler",1706707644).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(res)));var ev_10030 = new cljs.core.Keyword(null,"trigger","trigger",4248979754).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(res));var loc_10031 = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"start","start",1123661780),new cljs.core.Keyword(null,"start","start",1123661780).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(res)),new cljs.core.Keyword(null,"end","end",1014004813),new cljs.core.Keyword(null,"end","end",1014004813).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(res))], null);if(cljs.core.truth_(new cljs.core.Keyword(null,"stack","stack",1123661306).cljs$core$IFn$_invoke$arity$1(result)))
{lt.object.raise.call(null,obj,new cljs.core.Keyword(null,"editor.eval.clj.exception","editor.eval.clj.exception",3664192387),result,new cljs.core.Keyword(null,"passed","passed",4313490402));
} else
{lt.object.raise.call(null,handler_10029,ev_10030,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"result","result",4374444943),new cljs.core.Keyword(null,"result","result",4374444943).cljs$core$IFn$_invoke$arity$1(result),new cljs.core.Keyword(null,"loc","loc",1014011570),loc_10031], null));
}
{
var G__10032 = seq__9931;
var G__10033 = chunk__9933;
var G__10034 = count__9934;
var G__10035 = (i__9935 + 1);
seq__9931 = G__10032;
chunk__9933 = G__10033;
count__9934 = G__10034;
i__9935 = G__10035;
continue;
}
} else
{var temp__4092__auto__ = cljs.core.seq.call(null,seq__9931);if(temp__4092__auto__)
{var seq__9931__$1 = temp__4092__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,seq__9931__$1))
{var c__7502__auto__ = cljs.core.chunk_first.call(null,seq__9931__$1);{
var G__10036 = cljs.core.chunk_rest.call(null,seq__9931__$1);
var G__10037 = c__7502__auto__;
var G__10038 = cljs.core.count.call(null,c__7502__auto__);
var G__10039 = 0;
seq__9931 = G__10036;
chunk__9933 = G__10037;
count__9934 = G__10038;
i__9935 = G__10039;
continue;
}
} else
{var result = cljs.core.first.call(null,seq__9931__$1);var meta_10040 = new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(result);var handler_10041 = lt.object.by_id.call(null,new cljs.core.Keyword(null,"handler","handler",1706707644).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(res)));var ev_10042 = new cljs.core.Keyword(null,"trigger","trigger",4248979754).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(res));var loc_10043 = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"start","start",1123661780),new cljs.core.Keyword(null,"start","start",1123661780).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(res)),new cljs.core.Keyword(null,"end","end",1014004813),new cljs.core.Keyword(null,"end","end",1014004813).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(res))], null);if(cljs.core.truth_(new cljs.core.Keyword(null,"stack","stack",1123661306).cljs$core$IFn$_invoke$arity$1(result)))
{lt.object.raise.call(null,obj,new cljs.core.Keyword(null,"editor.eval.clj.exception","editor.eval.clj.exception",3664192387),result,new cljs.core.Keyword(null,"passed","passed",4313490402));
} else
{lt.object.raise.call(null,handler_10041,ev_10042,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"result","result",4374444943),new cljs.core.Keyword(null,"result","result",4374444943).cljs$core$IFn$_invoke$arity$1(result),new cljs.core.Keyword(null,"loc","loc",1014011570),loc_10043], null));
}
{
var G__10044 = cljs.core.next.call(null,seq__9931__$1);
var G__10045 = null;
var G__10046 = 0;
var G__10047 = 0;
seq__9931 = G__10044;
chunk__9933 = G__10045;
count__9934 = G__10046;
i__9935 = G__10047;
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
var meta = new cljs.core.Keyword(null,"meta","meta",1017252215).cljs$core$IFn$_invoke$arity$1(res);var loc = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",1017226086),(new cljs.core.Keyword(null,"end-line","end-line",2693041432).cljs$core$IFn$_invoke$arity$1(meta) - 1),new cljs.core.Keyword(null,"ch","ch",1013907415),new cljs.core.Keyword(null,"end-column","end-column",3799845882).cljs$core$IFn$_invoke$arity$1(meta),new cljs.core.Keyword(null,"start-line","start-line",3689311729),(new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(meta) - 1)], null);var msg = (function (){var or__6760__auto__ = new cljs.core.Keyword(null,"stack","stack",1123661306).cljs$core$IFn$_invoke$arity$1(res);if(cljs.core.truth_(or__6760__auto__))
{return or__6760__auto__;
} else
{return new cljs.core.Keyword(null,"ex","ex",1013907493).cljs$core$IFn$_invoke$arity$1(res);
}
})();var stack = (function (){var or__6760__auto__ = new cljs.core.Keyword(null,"stack","stack",1123661306).cljs$core$IFn$_invoke$arity$1(res);if(cljs.core.truth_(or__6760__auto__))
{return or__6760__auto__;
} else
{var or__6760__auto____$1 = (cljs.core.truth_((function (){var and__6748__auto__ = new cljs.core.Keyword(null,"ex","ex",1013907493).cljs$core$IFn$_invoke$arity$1(res);if(cljs.core.truth_(and__6748__auto__))
{return new cljs.core.Keyword(null,"ex","ex",1013907493).cljs$core$IFn$_invoke$arity$1(res).stack;
} else
{return and__6748__auto__;
}
})())?new cljs.core.Keyword(null,"ex","ex",1013907493).cljs$core$IFn$_invoke$arity$1(res).stack:(cljs.core.truth_(new cljs.core.Keyword(null,"ex","ex",1013907493).cljs$core$IFn$_invoke$arity$1(res))?(cljs.core.truth_(new cljs.core.Keyword(null,"verbatim","verbatim",3307884968).cljs$core$IFn$_invoke$arity$1(meta))?new cljs.core.Keyword(null,"ex","ex",1013907493).cljs$core$IFn$_invoke$arity$1(res):cljs.core.pr_str.call(null,new cljs.core.Keyword(null,"ex","ex",1013907493).cljs$core$IFn$_invoke$arity$1(res))):null));if(cljs.core.truth_(or__6760__auto____$1))
{return or__6760__auto____$1;
} else
{var or__6760__auto____$2 = msg;if(cljs.core.truth_(or__6760__auto____$2))
{return or__6760__auto____$2;
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
{return lt.objs.console.loc_log.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"file","file",1017047278),lt.objs.files.basename.call(null,(function (){var or__6760__auto__ = new cljs.core.Keyword(null,"name","name",1017277949).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$));if(cljs.core.truth_(or__6760__auto__))
{return or__6760__auto__;
} else
{var or__6760__auto____$1 = new cljs.core.Keyword(null,"path","path",1017337751).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"info","info",1017141280).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)));if(cljs.core.truth_(or__6760__auto____$1))
{return or__6760__auto____$1;
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
lt.plugins.clojure.__BEH__require_jar = (function __BEH__require_jar(this$,path){var code = cljs.core.pr_str.call(null,cljs.core.with_meta.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,cljs.core.with_meta.call(null,new cljs.core.Symbol("pomegranate","add-classpath","pomegranate/add-classpath",-1341356599,null),cljs.core.apply.call(null,cljs.core.hash_map,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Keyword(null,"line","line",1017226086)),cljs.core._conj.call(null,cljs.core.List.EMPTY,477),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Keyword(null,"column","column",3954034376)),cljs.core._conj.call(null,cljs.core.List.EMPTY,44),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Keyword(null,"end-line","end-line",2693041432)),cljs.core._conj.call(null,cljs.core.List.EMPTY,477),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Keyword(null,"end-column","end-column",3799845882)),cljs.core._conj.call(null,cljs.core.List.EMPTY,69)))))),cljs.core._conj.call(null,cljs.core.List.EMPTY,path))),cljs.core.apply.call(null,cljs.core.hash_map,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Keyword(null,"line","line",1017226086)),cljs.core._conj.call(null,cljs.core.List.EMPTY,477),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Keyword(null,"column","column",3954034376)),cljs.core._conj.call(null,cljs.core.List.EMPTY,43),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Keyword(null,"end-line","end-line",2693041432)),cljs.core._conj.call(null,cljs.core.List.EMPTY,477),cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Keyword(null,"end-column","end-column",3799845882)),cljs.core._conj.call(null,cljs.core.List.EMPTY,76))))));return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"send!","send!",1123226891),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"cb","cb",1013907409),lt.object.__GT_id.call(null,this$),new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"editor.eval.clj","editor.eval.clj",1083014050),new cljs.core.Keyword(null,"data","data",1016980252),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"code","code",1016963423),code,new cljs.core.Keyword(null,"ns","ns",1013907767),"user",new cljs.core.Keyword(null,"meta","meta",1017252215),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"result-type","result-type",4725630556),new cljs.core.Keyword(null,"dependencies","dependencies",1517678747)], null)], null)], null));
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure","require-jar","lt.plugins.clojure/require-jar",1833506945),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.__BEH__require_jar,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"connect","connect",1965255772),null], null), null));
lt.plugins.clojure.__BEH__connect = (function __BEH__connect(this$,path){return lt.plugins.clojure.try_connect.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"info","info",1017141280),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"path","path",1017337751),path], null)], null));
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure","connect","lt.plugins.clojure/connect",3228562392),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.__BEH__connect,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"connect","connect",1965255772),null], null), null));
lt.objs.sidebar.clients.add_connector.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"name","name",1017277949),"Clojure",new cljs.core.Keyword(null,"desc","desc",1016984067),"Select a project.clj to connect to for either Clojure or ClojureScript.",new cljs.core.Keyword(null,"connect","connect",1965255772),(function (){return lt.objs.dialogs.file.call(null,lt.plugins.clojure.clj_lang,new cljs.core.Keyword(null,"connect","connect",1965255772));
})], null));
lt.plugins.clojure.server_input = (function server_input(){var e__8128__auto__ = crate.core.html.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input","input",1114262332),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1017479852),"text",new cljs.core.Keyword(null,"placeholder","placeholder",1612151013),"host:port",new cljs.core.Keyword(null,"value","value",1125876963),"localhost:"], null)], null));var seq__9943_10048 = cljs.core.seq.call(null,cljs.core.partition.call(null,2,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"focus","focus",1111509066),(function (){return lt.objs.context.in_BANG_.call(null,new cljs.core.Keyword(null,"popup.input","popup.input",4788025210));
}),new cljs.core.Keyword(null,"blur","blur",1016931289),(function (){return lt.objs.context.out_BANG_.call(null,new cljs.core.Keyword(null,"popup.input","popup.input",4788025210));
})], null)));var chunk__9944_10049 = null;var count__9945_10050 = 0;var i__9946_10051 = 0;while(true){
if((i__9946_10051 < count__9945_10050))
{var vec__9947_10052 = cljs.core._nth.call(null,chunk__9944_10049,i__9946_10051);var ev__8129__auto___10053 = cljs.core.nth.call(null,vec__9947_10052,0,null);var func__8130__auto___10054 = cljs.core.nth.call(null,vec__9947_10052,1,null);lt.util.dom.on.call(null,e__8128__auto__,ev__8129__auto___10053,func__8130__auto___10054);
{
var G__10055 = seq__9943_10048;
var G__10056 = chunk__9944_10049;
var G__10057 = count__9945_10050;
var G__10058 = (i__9946_10051 + 1);
seq__9943_10048 = G__10055;
chunk__9944_10049 = G__10056;
count__9945_10050 = G__10057;
i__9946_10051 = G__10058;
continue;
}
} else
{var temp__4092__auto___10059 = cljs.core.seq.call(null,seq__9943_10048);if(temp__4092__auto___10059)
{var seq__9943_10060__$1 = temp__4092__auto___10059;if(cljs.core.chunked_seq_QMARK_.call(null,seq__9943_10060__$1))
{var c__7502__auto___10061 = cljs.core.chunk_first.call(null,seq__9943_10060__$1);{
var G__10062 = cljs.core.chunk_rest.call(null,seq__9943_10060__$1);
var G__10063 = c__7502__auto___10061;
var G__10064 = cljs.core.count.call(null,c__7502__auto___10061);
var G__10065 = 0;
seq__9943_10048 = G__10062;
chunk__9944_10049 = G__10063;
count__9945_10050 = G__10064;
i__9946_10051 = G__10065;
continue;
}
} else
{var vec__9948_10066 = cljs.core.first.call(null,seq__9943_10060__$1);var ev__8129__auto___10067 = cljs.core.nth.call(null,vec__9948_10066,0,null);var func__8130__auto___10068 = cljs.core.nth.call(null,vec__9948_10066,1,null);lt.util.dom.on.call(null,e__8128__auto__,ev__8129__auto___10067,func__8130__auto___10068);
{
var G__10069 = cljs.core.next.call(null,seq__9943_10060__$1);
var G__10070 = null;
var G__10071 = 0;
var G__10072 = 0;
seq__9943_10048 = G__10069;
chunk__9944_10049 = G__10070;
count__9945_10050 = G__10071;
i__9946_10051 = G__10072;
continue;
}
}
} else
{}
}
break;
}
return e__8128__auto__;
});
lt.plugins.clojure.connect_to_remote = (function connect_to_remote(server){var vec__9950 = clojure.string.split.call(null,server,":");var host = cljs.core.nth.call(null,vec__9950,0,null);var port = cljs.core.nth.call(null,vec__9950,1,null);if(cljs.core.truth_((function (){var and__6748__auto__ = host;if(cljs.core.truth_(and__6748__auto__))
{return port;
} else
{return and__6748__auto__;
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
lt.plugins.clojure.find_symbol_at_cursor = (function find_symbol_at_cursor(editor){var loc = lt.objs.editor.__GT_cursor.call(null,editor);var token_left = lt.objs.editor.__GT_token.call(null,editor,loc);var token_right = lt.objs.editor.__GT_token.call(null,editor,cljs.core.update_in.call(null,loc,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ch","ch",1013907415)], null),cljs.core.inc));var or__6760__auto__ = (cljs.core.truth_(lt.plugins.clojure.symbol_token_QMARK_.call(null,new cljs.core.Keyword(null,"string","string",4416885635).cljs$core$IFn$_invoke$arity$1(token_right)))?cljs.core.assoc.call(null,token_right,new cljs.core.Keyword(null,"loc","loc",1014011570),loc):null);if(cljs.core.truth_(or__6760__auto__))
{return or__6760__auto__;
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
lt.plugins.clojure.__BEH__finish_jump_to_definition = (function __BEH__finish_jump_to_definition(editor,p__9951){var map__9953 = p__9951;var map__9953__$1 = ((cljs.core.seq_QMARK_.call(null,map__9953))?cljs.core.apply.call(null,cljs.core.hash_map,map__9953):map__9953);var res = map__9953__$1;var line = cljs.core.get.call(null,map__9953__$1,new cljs.core.Keyword(null,"line","line",1017226086));var file = cljs.core.get.call(null,map__9953__$1,new cljs.core.Keyword(null,"file","file",1017047278));if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"jump","jump",1017178016),new cljs.core.Keyword(null,"result-type","result-type",4725630556).cljs$core$IFn$_invoke$arity$1(res)))
{if(cljs.core.truth_((function (){var and__6748__auto__ = res;if(cljs.core.truth_(and__6748__auto__))
{var and__6748__auto____$1 = file;if(cljs.core.truth_(and__6748__auto____$1))
{return line;
} else
{return and__6748__auto____$1;
}
} else
{return and__6748__auto__;
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
lt.plugins.clojure.windows_escape = (function windows_escape(s){if(cljs.core.truth_((function (){var and__6748__auto__ = lt.util.cljs.str_contains_QMARK_.call(null,s," ");if(cljs.core.truth_(and__6748__auto__))
{return lt.objs.platform.win_QMARK_.call(null);
} else
{return and__6748__auto__;
}
})()))
{return lt.plugins.clojure.wrap_quotes.call(null,s);
} else
{return s;
}
});
lt.plugins.clojure.jar_command = (function jar_command(path,name,client){return [cljs.core.str((function (){var or__6760__auto__ = new cljs.core.Keyword(null,"java-exe","java-exe",4725979993).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.plugins.clojure.clj_lang));if(cljs.core.truth_(or__6760__auto__))
{return or__6760__auto__;
} else
{return "java";
}
})()),cljs.core.str(" -jar "),cljs.core.str(lt.plugins.clojure.windows_escape.call(null,lt.plugins.clojure.jar_path)),cljs.core.str(" "),cljs.core.str(name)].join('');
});
lt.plugins.clojure.run_jar = (function run_jar(p__9954){var map__9956 = p__9954;var map__9956__$1 = ((cljs.core.seq_QMARK_.call(null,map__9956))?cljs.core.apply.call(null,cljs.core.hash_map,map__9956):map__9956);var client = cljs.core.get.call(null,map__9956__$1,new cljs.core.Keyword(null,"client","client",3951159101));var name = cljs.core.get.call(null,map__9956__$1,new cljs.core.Keyword(null,"name","name",1017277949));var project_path = cljs.core.get.call(null,map__9956__$1,new cljs.core.Keyword(null,"project-path","project-path",1907176907));var path = cljs.core.get.call(null,map__9956__$1,new cljs.core.Keyword(null,"path","path",1017337751));var obj = lt.object.create.call(null,new cljs.core.Keyword("lt.plugins.clojure","connecting-notifier","lt.plugins.clojure/connecting-notifier",1801195529),lt.plugins.clojure.n,lt.objs.clients.__GT_id.call(null,client));var args = new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["-Xmx1g","-jar",lt.plugins.clojure.windows_escape.call(null,lt.plugins.clojure.jar_path)], null);lt.objs.notifos.working.call(null,"Connecting..");
lt.objs.console.core_log.write([cljs.core.str("STARTING CLIENT: "),cljs.core.str(lt.plugins.clojure.jar_command.call(null,project_path,name,client))].join(''));
lt.objs.proc.exec.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"command","command",1964298941),(function (){var or__6760__auto__ = new cljs.core.Keyword(null,"java-exe","java-exe",4725979993).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.plugins.clojure.clj_lang));if(cljs.core.truth_(or__6760__auto__))
{return or__6760__auto__;
} else
{return "java";
}
})(),new cljs.core.Keyword(null,"args","args",1016906831),(cljs.core.truth_(name)?cljs.core.conj.call(null,args,name):args),new cljs.core.Keyword(null,"cwd","cwd",1014003170),project_path,new cljs.core.Keyword(null,"obj","obj",1014014057),obj], null));
lt.object.merge_BANG_.call(null,client,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"dir","dir",1014003711),project_path], null));
return lt.object.raise.call(null,client,new cljs.core.Keyword(null,"try-connect!","try-connect!",1801329595));
});
lt.plugins.clojure.run_local_server = (function run_local_server(client){return lt.plugins.clojure.check_all.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"path","path",1017337751),lt.plugins.clojure.local_project_clj,new cljs.core.Keyword(null,"client","client",3951159101),client,new cljs.core.Keyword(null,"name","name",1017277949),lt.plugins.clojure.local_name], null));
});
lt.plugins.clojure.check_java = (function check_java(obj){return cljs.core.assoc.call(null,obj,new cljs.core.Keyword(null,"java","java",1017159060),(function (){var or__6760__auto__ = new cljs.core.Keyword(null,"java-exe","java-exe",4725979993).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.plugins.clojure.clj_lang));if(cljs.core.truth_(or__6760__auto__))
{return or__6760__auto__;
} else
{var or__6760__auto____$1 = (process.env["JAVA_HOME"]);if(cljs.core.truth_(or__6760__auto____$1))
{return or__6760__auto____$1;
} else
{return lt.plugins.clojure.shell.which("java");
}
}
})());
});
lt.plugins.clojure.check_ltjar = (function check_ltjar(obj){return cljs.core.assoc.call(null,obj,new cljs.core.Keyword(null,"ltjar","ltjar",1117205253),lt.objs.files.exists_QMARK_.call(null,lt.plugins.clojure.jar_path));
});
lt.plugins.clojure.find_project = (function find_project(obj){var p = new cljs.core.Keyword(null,"path","path",1017337751).cljs$core$IFn$_invoke$arity$1(obj);var roots = lt.objs.files.get_roots.call(null);var cur = p;var prev = "";while(true){
if(cljs.core.truth_((function (){var or__6760__auto__ = cljs.core.empty_QMARK_.call(null,cur);if(or__6760__auto__)
{return or__6760__auto__;
} else
{var or__6760__auto____$1 = roots.call(null,cur);if(cljs.core.truth_(or__6760__auto____$1))
{return or__6760__auto____$1;
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
var G__10073 = lt.objs.files.parent.call(null,cur);
var G__10074 = cur;
cur = G__10073;
prev = G__10074;
continue;
}
}
}
break;
}
});
lt.plugins.clojure.notify = (function notify(obj){var map__9958 = obj;var map__9958__$1 = ((cljs.core.seq_QMARK_.call(null,map__9958))?cljs.core.apply.call(null,cljs.core.hash_map,map__9958):map__9958);var ltjar = cljs.core.get.call(null,map__9958__$1,new cljs.core.Keyword(null,"ltjar","ltjar",1117205253));var path = cljs.core.get.call(null,map__9958__$1,new cljs.core.Keyword(null,"path","path",1017337751));var project_path = cljs.core.get.call(null,map__9958__$1,new cljs.core.Keyword(null,"project-path","project-path",1907176907));var java = cljs.core.get.call(null,map__9958__$1,new cljs.core.Keyword(null,"java","java",1017159060));if((cljs.core.not.call(null,java)) || (cljs.core.empty_QMARK_.call(null,java)))
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
lt.object.merge_BANG_.call(null,new cljs.core.Keyword(null,"main","main",1017248043).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"info","info",1017141280),cljs.core.assoc.call(null,new cljs.core.Keyword(null,"info","info",1017141280).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,new cljs.core.Keyword(null,"main","main",1017248043).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)))),new cljs.core.Keyword(null,"ns","ns",1013907767),(function (){var or__6760__auto__ = new cljs.core.Keyword(null,"ns","ns",1013907767).cljs$core$IFn$_invoke$arity$1(res);if(cljs.core.truth_(or__6760__auto__))
{return or__6760__auto__;
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
lt.plugins.clojure.instarepl.__BEH__cleanup_on_destroy = (function __BEH__cleanup_on_destroy(this$){var seq__8614 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"widgets","widgets",2354242081).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,new cljs.core.Keyword(null,"main","main",1017248043).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)))));var chunk__8615 = null;var count__8616 = 0;var i__8617 = 0;while(true){
if((i__8617 < count__8616))
{var vec__8618 = cljs.core._nth.call(null,chunk__8615,i__8617);var _ = cljs.core.nth.call(null,vec__8618,0,null);var w = cljs.core.nth.call(null,vec__8618,1,null);lt.object.raise.call(null,w,new cljs.core.Keyword(null,"clear!","clear!",3951036134));
{
var G__8667 = seq__8614;
var G__8668 = chunk__8615;
var G__8669 = count__8616;
var G__8670 = (i__8617 + 1);
seq__8614 = G__8667;
chunk__8615 = G__8668;
count__8616 = G__8669;
i__8617 = G__8670;
continue;
}
} else
{var temp__4092__auto__ = cljs.core.seq.call(null,seq__8614);if(temp__4092__auto__)
{var seq__8614__$1 = temp__4092__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,seq__8614__$1))
{var c__7502__auto__ = cljs.core.chunk_first.call(null,seq__8614__$1);{
var G__8671 = cljs.core.chunk_rest.call(null,seq__8614__$1);
var G__8672 = c__7502__auto__;
var G__8673 = cljs.core.count.call(null,c__7502__auto__);
var G__8674 = 0;
seq__8614 = G__8671;
chunk__8615 = G__8672;
count__8616 = G__8673;
i__8617 = G__8674;
continue;
}
} else
{var vec__8619 = cljs.core.first.call(null,seq__8614__$1);var _ = cljs.core.nth.call(null,vec__8619,0,null);var w = cljs.core.nth.call(null,vec__8619,1,null);lt.object.raise.call(null,w,new cljs.core.Keyword(null,"clear!","clear!",3951036134));
{
var G__8675 = cljs.core.next.call(null,seq__8614__$1);
var G__8676 = null;
var G__8677 = 0;
var G__8678 = 0;
seq__8614 = G__8675;
chunk__8615 = G__8676;
count__8616 = G__8677;
i__8617 = G__8678;
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
lt.plugins.clojure.instarepl.update_res = (function update_res(this$,results){var main = new cljs.core.Keyword(null,"main","main",1017248043).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$));var vs = cljs.reader.read_string.call(null,new cljs.core.Keyword(null,"vals","vals",1017516260).cljs$core$IFn$_invoke$arity$1(results));var repls = new cljs.core.Keyword(null,"uses","uses",1017503550).cljs$core$IFn$_invoke$arity$1(results);var out = new cljs.core.Keyword(null,"out","out",1014014656).cljs$core$IFn$_invoke$arity$1(results);return lt.objs.editor.operation.call(null,new cljs.core.Keyword(null,"main","main",1017248043).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,this$)),(function (){var seq__8632_8679 = cljs.core.seq.call(null,new cljs.core.Keyword("lt.plugins.clojure.instarepl","widgets","lt.plugins.clojure.instarepl/widgets",653819200).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,main)));var chunk__8633_8680 = null;var count__8634_8681 = 0;var i__8635_8682 = 0;while(true){
if((i__8635_8682 < count__8634_8681))
{var w_8683 = cljs.core._nth.call(null,chunk__8633_8680,i__8635_8682);lt.object.raise.call(null,w_8683,new cljs.core.Keyword(null,"clear!","clear!",3951036134));
{
var G__8684 = seq__8632_8679;
var G__8685 = chunk__8633_8680;
var G__8686 = count__8634_8681;
var G__8687 = (i__8635_8682 + 1);
seq__8632_8679 = G__8684;
chunk__8633_8680 = G__8685;
count__8634_8681 = G__8686;
i__8635_8682 = G__8687;
continue;
}
} else
{var temp__4092__auto___8688 = cljs.core.seq.call(null,seq__8632_8679);if(temp__4092__auto___8688)
{var seq__8632_8689__$1 = temp__4092__auto___8688;if(cljs.core.chunked_seq_QMARK_.call(null,seq__8632_8689__$1))
{var c__7502__auto___8690 = cljs.core.chunk_first.call(null,seq__8632_8689__$1);{
var G__8691 = cljs.core.chunk_rest.call(null,seq__8632_8689__$1);
var G__8692 = c__7502__auto___8690;
var G__8693 = cljs.core.count.call(null,c__7502__auto___8690);
var G__8694 = 0;
seq__8632_8679 = G__8691;
chunk__8633_8680 = G__8692;
count__8634_8681 = G__8693;
i__8635_8682 = G__8694;
continue;
}
} else
{var w_8695 = cljs.core.first.call(null,seq__8632_8689__$1);lt.object.raise.call(null,w_8695,new cljs.core.Keyword(null,"clear!","clear!",3951036134));
{
var G__8696 = cljs.core.next.call(null,seq__8632_8689__$1);
var G__8697 = null;
var G__8698 = 0;
var G__8699 = 0;
seq__8632_8679 = G__8696;
chunk__8633_8680 = G__8697;
count__8634_8681 = G__8698;
i__8635_8682 = G__8699;
continue;
}
}
} else
{}
}
break;
}
return lt.object.merge_BANG_.call(null,main,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("lt.plugins.clojure.instarepl","widgets","lt.plugins.clojure.instarepl/widgets",653819200),cljs.core.doall.call(null,(function (){var iter__7471__auto__ = (function iter__8636(s__8637){return (new cljs.core.LazySeq(null,(function (){var s__8637__$1 = s__8637;while(true){
var temp__4092__auto__ = cljs.core.seq.call(null,s__8637__$1);if(temp__4092__auto__)
{var s__8637__$2 = temp__4092__auto__;if(cljs.core.chunked_seq_QMARK_.call(null,s__8637__$2))
{var c__7469__auto__ = cljs.core.chunk_first.call(null,s__8637__$2);var size__7470__auto__ = cljs.core.count.call(null,c__7469__auto__);var b__8639 = cljs.core.chunk_buffer.call(null,size__7470__auto__);if((function (){var i__8638 = 0;while(true){
if((i__8638 < size__7470__auto__))
{var r = cljs.core._nth.call(null,c__7469__auto__,i__8638);var vec__8642 = lt.plugins.clojure.instarepl.__GT_type_BAR_val.call(null,r,vs);var type = cljs.core.nth.call(null,vec__8642,0,null);var val = cljs.core.nth.call(null,vec__8642,1,null);cljs.core.chunk_append.call(null,b__8639,lt.plugins.clojure.instarepl.inline.call(null,main,val,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1017479852),type,new cljs.core.Keyword(null,"line","line",1017226086),(cljs.core.first.call(null,new cljs.core.Keyword(null,"cur","cur",1014003122).cljs$core$IFn$_invoke$arity$1(r)) - 1)], null)));
{
var G__8700 = (i__8638 + 1);
i__8638 = G__8700;
continue;
}
} else
{return true;
}
break;
}
})())
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__8639),iter__8636.call(null,cljs.core.chunk_rest.call(null,s__8637__$2)));
} else
{return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__8639),null);
}
} else
{var r = cljs.core.first.call(null,s__8637__$2);var vec__8643 = lt.plugins.clojure.instarepl.__GT_type_BAR_val.call(null,r,vs);var type = cljs.core.nth.call(null,vec__8643,0,null);var val = cljs.core.nth.call(null,vec__8643,1,null);return cljs.core.cons.call(null,lt.plugins.clojure.instarepl.inline.call(null,main,val,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1017479852),type,new cljs.core.Keyword(null,"line","line",1017226086),(cljs.core.first.call(null,new cljs.core.Keyword(null,"cur","cur",1014003122).cljs$core$IFn$_invoke$arity$1(r)) - 1)], null)),iter__8636.call(null,cljs.core.rest.call(null,s__8637__$2)));
}
} else
{return null;
}
break;
}
}),null,null));
});return iter__7471__auto__.call(null,repls);
})())], null));
}));
});
lt.plugins.clojure.instarepl.__BEH__start_content = (function __BEH__start_content(this$,res,content){return content;
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure.instarepl","start-content","lt.plugins.clojure.instarepl/start-content",4699205791),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.clojure.instarepl.__BEH__start_content,new cljs.core.Keyword(null,"desc","desc",1016984067),"Instarepl: Set start content",new cljs.core.Keyword(null,"params","params",4313443576),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"label","label",1116631654),"content"], null)], null),new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"start-content+","start-content+",2652166991),null], null), null),new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"user","user",1017503549));
lt.plugins.clojure.instarepl.live_toggle = (function live_toggle(this$){var e__8128__auto__ = crate.core.html.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1017440956),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",1108647146),crate.binding.bound.call(null,this$,(function (p1__8644_SHARP_){return [cljs.core.str("livetoggler "),cljs.core.str((cljs.core.truth_(new cljs.core.Keyword(null,"live","live",1017226334).cljs$core$IFn$_invoke$arity$1(p1__8644_SHARP_))?null:"off"))].join('');
}))], null),"live"], null));var seq__8651_8701 = cljs.core.seq.call(null,cljs.core.partition.call(null,2,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"click","click",1108654330),(function (e){lt.util.dom.prevent.call(null,e);
return lt.object.raise.call(null,this$,new cljs.core.Keyword(null,"live.toggle!","live.toggle!",4497782717));
})], null)));var chunk__8652_8702 = null;var count__8653_8703 = 0;var i__8654_8704 = 0;while(true){
if((i__8654_8704 < count__8653_8703))
{var vec__8655_8705 = cljs.core._nth.call(null,chunk__8652_8702,i__8654_8704);var ev__8129__auto___8706 = cljs.core.nth.call(null,vec__8655_8705,0,null);var func__8130__auto___8707 = cljs.core.nth.call(null,vec__8655_8705,1,null);lt.util.dom.on.call(null,e__8128__auto__,ev__8129__auto___8706,func__8130__auto___8707);
{
var G__8708 = seq__8651_8701;
var G__8709 = chunk__8652_8702;
var G__8710 = count__8653_8703;
var G__8711 = (i__8654_8704 + 1);
seq__8651_8701 = G__8708;
chunk__8652_8702 = G__8709;
count__8653_8703 = G__8710;
i__8654_8704 = G__8711;
continue;
}
} else
{var temp__4092__auto___8712 = cljs.core.seq.call(null,seq__8651_8701);if(temp__4092__auto___8712)
{var seq__8651_8713__$1 = temp__4092__auto___8712;if(cljs.core.chunked_seq_QMARK_.call(null,seq__8651_8713__$1))
{var c__7502__auto___8714 = cljs.core.chunk_first.call(null,seq__8651_8713__$1);{
var G__8715 = cljs.core.chunk_rest.call(null,seq__8651_8713__$1);
var G__8716 = c__7502__auto___8714;
var G__8717 = cljs.core.count.call(null,c__7502__auto___8714);
var G__8718 = 0;
seq__8651_8701 = G__8715;
chunk__8652_8702 = G__8716;
count__8653_8703 = G__8717;
i__8654_8704 = G__8718;
continue;
}
} else
{var vec__8656_8719 = cljs.core.first.call(null,seq__8651_8713__$1);var ev__8129__auto___8720 = cljs.core.nth.call(null,vec__8656_8719,0,null);var func__8130__auto___8721 = cljs.core.nth.call(null,vec__8656_8719,1,null);lt.util.dom.on.call(null,e__8128__auto__,ev__8129__auto___8720,func__8130__auto___8721);
{
var G__8722 = cljs.core.next.call(null,seq__8651_8713__$1);
var G__8723 = null;
var G__8724 = 0;
var G__8725 = 0;
seq__8651_8701 = G__8722;
chunk__8652_8702 = G__8723;
count__8653_8703 = G__8724;
i__8654_8704 = G__8725;
continue;
}
}
} else
{}
}
break;
}
return e__8128__auto__;
});
lt.object.object_STAR_.call(null,new cljs.core.Keyword("lt.plugins.clojure.instarepl","instarepl","lt.plugins.clojure.instarepl/instarepl",1692574563),new cljs.core.Keyword(null,"tags","tags",1017456523),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"instarepl","instarepl",1043123260),null], null), null),new cljs.core.Keyword(null,"name","name",1017277949),"Instarepl",new cljs.core.Keyword(null,"live","live",1017226334),true,new cljs.core.Keyword(null,"init","init",1017141378),(function (this$){var main = lt.object.add_tags.call(null,lt.object.remove_tags.call(null,lt.objs.editor.pool.create.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"mime","mime",1017255846),"text/x-clojure",new cljs.core.Keyword(null,"content","content",1965434859),"",new cljs.core.Keyword(null,"ns","ns",1013907767),"user"], null)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"editor.clj","editor.clj",3751346322)], null)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"editor.clj.instarepl","editor.clj.instarepl",2477999342),new cljs.core.Keyword(null,"editor.transient","editor.transient",3554141883)], null));lt.object.merge_BANG_.call(null,main,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"frame","frame",1111596255),this$], null));
lt.objs.editor.set_val.call(null,main,(function (){var or__6760__auto__ = lt.object.raise_reduce.call(null,main,new cljs.core.Keyword(null,"start-content+","start-content+",2652166991));if(cljs.core.truth_(or__6760__auto__))
{return or__6760__auto__;
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