/* SpriteSwap backend bridge (Supabase)
   Works automatically when supabase-config.js contains a real project URL + publishable key.
   Otherwise SpriteSwap keeps its local demo mode.
*/
(function(){
  const ready=(async()=>{
    try{
      const cfg=await import('./supabase-config.js');
      const configured=cfg.SUPABASE_URL&&cfg.SUPABASE_ANON_KEY&&!String(cfg.SUPABASE_URL).includes('YOUR-PROJECT-REF')&&!String(cfg.SUPABASE_ANON_KEY).includes('YOUR_SUPABASE');
      if(!configured) return null;
      const mod=await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm');
      const client=mod.createClient(cfg.SUPABASE_URL,cfg.SUPABASE_ANON_KEY);
      window.SpriteSwapBackend={
        client,
        enabled:true,
        async user(){const {data}=await client.auth.getUser();return data?.user||null},
        async pullTrades(){const {data,error}=await client.from('trades').select('*').eq('status','open').order('created_at',{ascending:false}).limit(250);if(error)throw error;return (data||[]).map(t=>({id:t.id,user:t.username||'Trader',tier:t.tier||'Base',offer:t.offer||[],want:t.want||[],note:t.note||'',created:t.created_at?new Date(t.created_at).getTime():Date.now(),remote:true}))},
        async pushTrade(t){const u=await this.user();if(!u) return null;const {data,error}=await client.from('trades').insert({user_id:u.id,username:t.user,tier:t.tier||'Base',offer:t.offer||[],want:t.want||[],note:t.note||'',status:'open'}).select().single();if(error)throw error;return data},
        async pushOffer(o){const u=await this.user();if(!u) return null;const {data:recipient}=await client.from('profiles').select('user_id').ilike('username',o.to).maybeSingle();const {data,error}=await client.from('trade_offers').insert({from_user_id:u.id,from_username:o.from,to_username:o.to,to_user_id:recipient?.user_id||null,offer:o.offer||[],want:o.want||[],status:o.status||'pending'}).select().single();if(error)throw error;return data},
        async pullOffers(){const u=await this.user();if(!u)return[];const {data,error}=await client.from('trade_offers').select('*').order('created_at',{ascending:false}).limit(100);if(error)throw error;return (data||[]).map(o=>({id:o.id,from:o.from_username,to:o.to_username,offer:o.offer||[],want:o.want||[],status:o.status||'pending',created:new Date(o.created_at).getTime(),remote:true}));},
        async updateOffer(id,status){const {error}=await client.from('trade_offers').update({status}).eq('id',id);if(error)throw error;},
        async pullNotifications(){const u=await this.user();if(!u)return[];const {data,error}=await client.from('notifications').select('*').eq('user_id',u.id).order('created_at',{ascending:false}).limit(50);if(error)throw error;return data||[]},
        async pushNotification(title,text,userId){const uid=userId||(await this.user())?.id;if(!uid)return null;const {data,error}=await client.from('notifications').insert({user_id:uid,title,text,read:false}).select().single();if(error)throw error;return data},
        async clearNotifications(){const u=await this.user();if(!u)return;const {error}=await client.from('notifications').delete().eq('user_id',u.id);if(error)throw error},
        async syncProfile(){const u=await this.user();if(!u)return;const username=u.user_metadata?.username||u.user_metadata?.full_name||u.user_metadata?.name||u.email?.split('@')[0]||'Trader';const {data:existing}=await client.from('profiles').select('user_id').ilike('username',username).neq('user_id',u.id).maybeSingle();if(existing){console.warn('Username already taken.');return {ok:false,error:'USERNAME_TAKEN'}}const {error}=await client.from('profiles').upsert({user_id:u.id,username,updated_at:new Date().toISOString()});if(error)console.warn('Profile backend sync failed:',error);return {ok:!error,error:error?.message||null}}
      };
      client.auth.onAuthStateChange(()=>window.SpriteSwapBackend?.syncProfile?.());
      window.dispatchEvent(new CustomEvent('spriteswap-backend-ready'));
      return window.SpriteSwapBackend;
    }catch(err){console.warn('SpriteSwap backend unavailable:',err);return null}
  })();
  window.SpriteSwapBackendReady=ready;
})();
