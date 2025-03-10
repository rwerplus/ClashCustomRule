const mineRules = [
  "DOMAIN,1024zyz.com,节点选择",
  "DOMAIN-SUFFIX,bigmeok.me,节点选择",
  "DOMAIN-SUFFIX,sorryios.com,节点选择",
  "DOMAIN,freebsd.org,节点选择",
  "RULE-SET,openai,AIGC",
  "DOMAIN,*.chatgpt.com,AIGC",
  "DOMAIN,*.perplexity.ai:443,AIGC",
  "DOMAIN,*.cursor.sh,AIGC",
  "DOMAIN,*.cursor.com,AIGC",
  "DOMAIN,*.perplexity.ai,AIGC",
  "PROCESS-NAME,Cursor,AIGC",
    "DOMAIN,*.chatgpt.com,AIGC",
  "DOMAIN-SUFFIX,cursor.sh,AIGC",
  "DOMAIN-SUFFIX,cursor.com,AIGC",
  "DOMAIN-SUFFIX,perplexity.ai,AIGC",
  "DOMAIN-SUFFIX,grok.com,AIGC",
  "DOMAIN-SUFFIX,api2.cursor.sh:443,AIGC",
  "DOMAIN-SUFFIX,codeium.com,AIGC",
  "DOMAIN-SUFFIX,sorryios.com,节点选择",
  "DOMAIN-SUFFIX,sorryios.net,节点选择",
  "DOMAIN-SUFFIX,sorryios.cc,节点选择",
  "DOMAIN-SUFFIX,nuxt.com,节点选择",
  "DOMAIN-SUFFIX,n.cc,节点选择",
  "DOMAIN-SUFFIX,githubcopilot.com,AIGC",
  "DOMAIN-SUFFIX,useblackbox.io,AIGC",
  "PROCESS-NAME,Cursor.exe,AIGC",
  "PROCESS-NAME,Windsurf.exe,AIGC",
  // 自定义规则
  "DOMAIN-SUFFIX,googleapis.cn,节点选择", // Google服务
  "DOMAIN-SUFFIX,gstatic.com,节点选择", // Google静态资源
  "DOMAIN-SUFFIX,xn--ngstr-lra8j.com,节点选择", // Google Play下载服务
  "DOMAIN-SUFFIX,github.io,节点选择", // Github Pages
  "DOMAIN-SUFFIX,v2rayse.com,节点选择", // V2rayse节点工具
  "DOMAIN-SUFFIX,tuxingkeji.com,全局直连", // V2rayse节点工具
  "DOMAIN-SUFFIX,15sm.cn,全局直连",
  "DOMAIN-SUFFIX,mf-site2.xyz,全局直连",
  "DOMAIN-SUFFIX,user.mf-site2.xyz,全局直连",
  "DOMAIN-SUFFIX,dji.net,全局直连",
  "DOMAIN-SUFFIX,556688.cfd,全局直连",
]
// 国内DNS服务器
const domesticNameservers = [
  "https://223.5.5.5", // 阿里云公共DNS
  "https://dns.alidns.com/dns-query", // 阿里云公共DNS
  "https://doh.pub/dns-query", // 腾讯DNSPod
  "https://doh.360.cn/dns-query", // 360安全DNS
];
// 国外DNS服务器
const foreignNameservers = [
  "https://1.1.1.1/dns-query", // Cloudflare(主)
  "https://1.0.0.1/dns-query", // Cloudflare(备)
  "https://208.67.222.222/dns-query", // OpenDNS(主)
  "https://208.67.220.220/dns-query", // OpenDNS(备)
  "https://194.242.2.2/dns-query", // Mullvad(主)
  "https://194.242.2.3/dns-query", // Mullvad(备)
];
// DNS配置
const dnsConfig = {
  enable: true,
  listen: "0.0.0.0:1053",
  ipv6: true,
  "use-system-hosts": false,
  "cache-algorithm": "arc",
  "enhanced-mode": "fake-ip",
  "fake-ip-range": "198.18.0.1/16",
  "fake-ip-filter": [
    // 本地主机/设备
    "+.lan",
    "+.local",
    // Windows网络出现小地球图标
    "+.msftconnecttest.com",
    "+.msftncsi.com",
    // QQ快速登录检测失败
    "localhost.ptlogin2.qq.com",
    "localhost.sec.qq.com",
    // 微信快速登录检测失败
    "localhost.work.weixin.qq.com",
  ],
  "default-nameserver": ["223.5.5.5", "119.29.29.29", "1.1.1.1", "8.8.8.8"],
  nameserver: [...domesticNameservers, ...foreignNameservers],
  "proxy-server-nameserver": [...domesticNameservers, ...foreignNameservers],
  "nameserver-policy": {
    "geosite:private,cn,geolocation-cn": domesticNameservers,
    "geosite:google,youtube,telegram,gfw,geolocation-!cn": foreignNameservers,
  },
};
// 规则集通用配置
const ruleProviderCommon = {
  type: "http",
  format: "yaml",
  interval: 86400,
};
// 规则集配置
const ruleProviders = {
  netflix: {
    ...ruleProviderCommon,
    behavior: "classical",
    url: "https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Netflix/Netflix_IP.txt",
    path: "./ruleset/blackmatrix7/netflix.yaml",
  },
  netflix_domain: {
    ...ruleProviderCommon,
    behavior: "classical",
    url: "https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Netflix/Netflix.yaml",
    path: "./ruleset/blackmatrix7/netflix_domain.yaml",
  },
  reject: {
    ...ruleProviderCommon,
    behavior: "domain",
    url: "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/reject.txt",
    path: "./ruleset/Loyalsoldier/Advertising.yaml",
  },
  spotify: {
    url: "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Spotify/Spotify.yaml",
    path: "./ruleset/Spotify.yaml",
    behavior: "classical",
    interval: 86400,
    format: "yaml",
    type: "http",
  },
  openai: {
    ...ruleProviderCommon,
    behavior: "classical",
    url: "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/OpenAI/OpenAI.yaml",
    path: "./ruleset/blackmatrix7/openai.yaml",
  },
  bahamut: {
    url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Bahamut/Bahamut.yaml",
    path: "./ruleset/Bahamut.yaml",
    behavior: "classical",
    interval: 86400,
    format: "yaml",
    type: "http",
  },
  telegram_domain: {
    url: "https://mirror.ghproxy.com/https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/meta/geo/geosite/telegram.yaml",
    path: "./ruleset/telegram_domain.yaml",
    behavior: "domain",
    interval: 86400,
    format: "yaml",
    type: "http",
  },
  icloud: {
    ...ruleProviderCommon,
    behavior: "domain",
    url: "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/icloud.txt",
    path: "./ruleset/loyalsoldier/icloud.yaml",
  },
  apple: {
    ...ruleProviderCommon,
    behavior: "domain",
    url: "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/apple.txt",
    path: "./ruleset/loyalsoldier/apple.yaml",
  },
  google: {
    ...ruleProviderCommon,
    behavior: "domain",
    url: "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/google.txt",
    path: "./ruleset/loyalsoldier/google.yaml",
  },
  proxy: {
    ...ruleProviderCommon,
    behavior: "domain",
    url: "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/proxy.txt",
    path: "./ruleset/loyalsoldier/proxy.yaml",
  },
  direct: {
    ...ruleProviderCommon,
    behavior: "domain",
    url: "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/direct.txt",
    path: "./ruleset/loyalsoldier/direct.yaml",
  },
  private: {
    ...ruleProviderCommon,
    behavior: "domain",
    url: "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/private.txt",
    path: "./ruleset/loyalsoldier/private.yaml",
  },
  gfw: {
    ...ruleProviderCommon,
    behavior: "domain",
    url: "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/gfw.txt",
    path: "./ruleset/loyalsoldier/gfw.yaml",
  },
  "tld-not-cn": {
    ...ruleProviderCommon,
    behavior: "domain",
    url: "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/tld-not-cn.txt",
    path: "./ruleset/loyalsoldier/tld-not-cn.yaml",
  },
  telegramcidr: {
    ...ruleProviderCommon,
    behavior: "ipcidr",
    url: "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/telegramcidr.txt",
    path: "./ruleset/loyalsoldier/telegramcidr.yaml",
  },
  cncidr: {
    ...ruleProviderCommon,
    behavior: "ipcidr",
    url: "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/cncidr.txt",
    path: "./ruleset/loyalsoldier/cncidr.yaml",
  },
  lancidr: {
    ...ruleProviderCommon,
    behavior: "ipcidr",
    url: "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/lancidr.txt",
    path: "./ruleset/loyalsoldier/lancidr.yaml",
  },
  applications: {
    ...ruleProviderCommon,
    behavior: "classical",
    url: "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/applications.txt",
    path: "./ruleset/loyalsoldier/applications.yaml",
  },
};
// 规则
const rules = [
  ...mineRules,
  // 自定义规则
  "RULE-SET,netflix_domain,Netflix",
  "DOMAIN-SUFFIX,googleapis.cn,节点选择", // Google服务
  "DOMAIN-SUFFIX,gstatic.com,节点选择", // Google静态资源
  "DOMAIN-SUFFIX,xn--ngstr-lra8j.com,节点选择", // Google Play下载服务
  "DOMAIN-SUFFIX,github.io,节点选择", // Github Pages
  "DOMAIN,v2rayse.com,节点选择", // V2rayse节点工具
  "RULE-SET,spotify,AIGC",
  // Loyalsoldier 规则集
  "RULE-SET,applications,全局直连",
  "RULE-SET,bahamut,Bahamut",
  "RULE-SET,netflix,Netflix",
  "RULE-SET,private,全局直连",
  "RULE-SET,reject,广告过滤",
  "RULE-SET,icloud,微软服务",
  "RULE-SET,apple,苹果服务",
  "RULE-SET,google,谷歌服务",
  "RULE-SET,proxy,节点选择",
  "RULE-SET,gfw,节点选择",
  "RULE-SET,tld-not-cn,节点选择",
  "RULE-SET,direct,全局直连",
  "RULE-SET,lancidr,全局直连,no-resolve",
  "RULE-SET,cncidr,全局直连,no-resolve",
  "RULE-SET,telegramcidr,电报消息,no-resolve",
  "RULE-SET,telegram_domain,电报消息",
  // 其他规则
  "GEOIP,LAN,全局直连,no-resolve",
  "GEOIP,CN,全局直连,no-resolve",
  "MATCH,漏网之鱼",
];
// 代理组通用配置
const groupBaseOption = {
  interval: 300,
  timeout: 3000,
  url: "https://www.google.com/generate_204",
  lazy: true,
  "max-failed-times": 3,
  hidden: false,
};
const defaultProxy = [
  "延迟选优",
  "AIGC",
  "负载均衡(散列)",
  "负载均衡(轮询)",
];
// 程序入口
function main(config) {
  const proxyCount = config?.proxies?.length ?? 0;
  const proxyProviderCount =
    typeof config?.["proxy-providers"] === "object"
      ? Object.keys(config["proxy-providers"]).length
      : 0;
  if (proxyCount === 0 && proxyProviderCount === 0) {
    throw new Error("配置文件中未找到任何代理");
  }

  // 覆盖原配置中的代理组
  config["proxy-groups"] = [
    {
      ...groupBaseOption,
      name: "节点选择",
      type: "select",
      proxies: defaultProxy,
      "include-all": false,
      icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/adjust.svg",
    },
    {
      ...groupBaseOption,
      name: "延迟选优",
      type: "url-test",
      tolerance: 100,
      "include-all": true,
      icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/speed.svg",
    },
	
    {
      ...groupBaseOption,
      "name": "负载均衡(散列)",
      "type": "load-balance",
      "strategy": "consistent-hashing",
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/merry_go.svg"
    },
    {
      ...groupBaseOption,
      "name": "负载均衡(轮询)",
      "type": "load-balance",
      "strategy": "round-robin",
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/balance.svg"
    },
    {
      ...groupBaseOption,
      name: "谷歌服务",
      type: "select",
      proxies: [
        ...defaultProxy,
		"节点选择",
        "HK AUTO",
        "SG AUTO",
        "JP AUTO",
        "US AUTO",
        "全局直连",
      ],
      icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/google.svg",
    },
    {
      ...groupBaseOption,
      name: "Netflix",
      type: "select",
      proxies: [
        ...defaultProxy,
		"节点选择",
        "HK AUTO",
        "SG AUTO",
        "JP AUTO",
        "US AUTO",
        "全局直连",
      ],
      icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/netflix.svg",
    },
    {
      ...groupBaseOption,
      name: "国外媒体",
      type: "select",
      proxies: [
        ...defaultProxy,
		"节点选择",
        "HK AUTO",
        "SG AUTO",
        "JP AUTO",
        "US AUTO",
        "全局直连",
      ],
      icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/youtube.svg",
    },
    {
      ...groupBaseOption,
      name: "电报消息",
      type: "select",
      proxies: [
        ...defaultProxy,
		"节点选择",
        "HK AUTO",
        "SG AUTO",
        "JP AUTO",
        "US AUTO",
        "全局直连",
      ],
      icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/telegram.svg",
    },
    {
      ...groupBaseOption,
      url: "https://chatgpt.com",
      "expected-status": "200",
      name: "AIGC",
      type: "select",
      "include-all": true,
      icon: "https://mirror.ghproxy.com/https://raw.githubusercontent.com/Orz-3/mini/master/Color/OpenAI.png",
    },
    {
      ...groupBaseOption,
      name: "微软服务",
      type: "select",
      proxies: ["全局直连", "节点选择",...defaultProxy],
      icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/microsoft.svg",
    },
    {
      ...groupBaseOption,
      icon: "https://mirror.ghproxy.com/https://raw.githubusercontent.com/Orz-3/mini/master/Color/Bahamut.png",
      name: "Bahamut",
      type: "select",
      proxies: ["TW AUTO", "HK AUTO", "JP AUTO", "US AUTO"],
    },
    {
      ...groupBaseOption,
      name: "苹果服务",
      type: "select",
      proxies: [...defaultProxy, "全局直连"],
      "include-all": true,
      icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/apple.svg",
    },
    {
      ...groupBaseOption,
      name: "广告过滤",
      type: "select",
      proxies: ["REJECT", "DIRECT"],
      icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/bug.svg",
    },
    {
      ...groupBaseOption,
      name: "全局直连",
      type: "select",
      proxies: ["DIRECT", ...defaultProxy],
      icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/link.svg",
    },
    {
      ...groupBaseOption,
      name: "漏网之鱼",
      type: "select",
      proxies: [...defaultProxy,"节点选择", "全局直连"],
      "include-all": false,
      icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/fish.svg",
    },
    // 分组不同地区
    {
      icon: "https://mirror.ghproxy.com/https://raw.githubusercontent.com/Orz-3/mini/master/Color/HK.png",
      "include-all": true,
      "exclude-filter":
        "(?i)GB|Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置",
      filter: "(?i)香港|Hong Kong|HK|🇭🇰",
      name: "HK AUTO",
      type: "url-test",
      interval: 300,
    },
    {
      icon: "https://mirror.ghproxy.com/https://raw.githubusercontent.com/Orz-3/mini/master/Color/TW.png",
      "include-all": true,
      "exclude-filter":
        "(?i)GB|Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置",
      filter: "(?i)台|新北|彰化|TW|Taiwan",
      name: "TW AUTO",
      type: "url-test",
      interval: 300,
    },
    {
      icon: "https://mirror.ghproxy.com/https://raw.githubusercontent.com/Orz-3/mini/master/Color/SG.png",
      "include-all": true,
      "exclude-filter":
        "(?i)GB|Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置",
      filter: "(?i)新加坡|Singapore|🇸🇬",
      name: "SG AUTO",
      type: "url-test",
      interval: 300,
    },
    {
      icon: "https://mirror.ghproxy.com/https://raw.githubusercontent.com/Orz-3/mini/master/Color/JP.png",
      "include-all": true,
      "exclude-filter":
        "(?i)GB|Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置",
      filter: "(?i)日本|Japan|🇯🇵",
      name: "JP AUTO",
      type: "url-test",
      interval: 300,
    },
    {
      icon: "https://mirror.ghproxy.com/https://raw.githubusercontent.com/Orz-3/mini/master/Color/US.png",
      "include-all": true,
      "exclude-filter":
        "(?i)GB|Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置",
      filter: "(?i)美国|USA|🇺🇸",
      name: "US AUTO",
      type: "url-test",
      interval: 300,
    },
    {
      icon: "https://mirror.ghproxy.com/https://raw.githubusercontent.com/Orz-3/mini/master/Color/Global.png",
      "include-all": false,
      "exclude-filter": "(?i)GB|Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置",
      proxies: ["全局直连",...defaultProxy],
      name: "GLOBAL",
      type: "select",
    }
  ]

  // 覆盖原配置中的规则
  config["rule-providers"] = ruleProviders;
  config["rules"] = rules;
  // 覆盖原配置中DNS配置
  // config["dns"] = dnsConfig;
  // 返回修改后的配置
  return config;
}
