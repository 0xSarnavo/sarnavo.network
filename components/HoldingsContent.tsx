export default function HoldingsContent() {
  const holdings = [
    {
      id: 1,
      name: "AVAX",
      logo: "/images/tokens/avax.png",
      url: "https://pharaoh.exchange/swap?to=AVAX&from=0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
    },
    {
      id: 2,
      name: "ggAVAX",
      logo: "/images/tokens/ggavax.png",
      url: "https://pharaoh.exchange/swap?to=0xA25EaF2906FA1a3a13EdAc9B9657108Af7B703e3&from=0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
    },
    {
      id: 3,
      name: "sAVAX",
      logo: "/images/tokens/savax.png",
      url: "https://pharaoh.exchange/swap?to=0x2b2C81e08f1Af8835a78Bb2A90AE924ACE0eA4bE&from=0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
    },
    {
      id: 4,
      name: "LINK",
      logo: "/images/tokens/link.png",
      url: "https://pharaoh.exchange/swap?to=0x5947BB275c521040051D82396192181b413227A3&from=0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
    },
    {
      id: 5,
      name: "WETH",
      logo: "/images/tokens/weth.png",
      url: "https://pharaoh.exchange/swap?to=0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB&from=0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
    },
    {
      id: 6,
      name: "BTC.b",
      logo: "/images/tokens/bitcoin.jpg",
      url: "https://pharaoh.exchange/swap?to=0x152b9d0FdC40C096757F570A51E494bd4b943E50&from=0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
    },
    { id: 7, name: "PHAR", logo: "/images/tokens/phar.png", url: "https://pharaoh.exchange/swap" },
    { id: 8, name: "ZAC", logo: "/images/tokens/zac.png", url: "https://electriccoin.co/zashi/" },
    {
      id: 9,
      name: "ARENA",
      logo: "/images/tokens/arena.png",
      url: "https://lfj.gg/avalanche/swap?outputCurrency=0xB8d7710f7d8349A506b75dD184F05777c82dAd0C",
    },
    {
      id: 10,
      name: "ART",
      logo: "/images/tokens/art.png",
      url: "https://lfj.gg/avalanche/swap?outputCurrency=0xF99516BC189AF00FF8EfFD5A1f2295B67d70a90e",
    },
    {
      id: 11,
      name: "BLAZE",
      logo: "/images/tokens/blaze.png",
      url: "https://lfj.gg/avalanche/swap?outputCurrency=0x297731Eb3CAB3834525fc9Ea061fd71d8f4645C9",
    },
    {
      id: 12,
      name: "QI",
      logo: "/images/tokens/qi.jpg",
      url: "https://lfj.gg/avalanche/swap?outputCurrency=0x8729438EB15e2C8B576fCc6AeCdA6A148776C0F5",
    },
    {
      id: 13,
      name: "MOANI",
      logo: "/images/tokens/moani.jpg",
      url: "https://lfj.gg/avalanche/swap?outputCurrency=0xEeC951BFDEB358371a19512C6c33CdD840d47DB0",
    },
    {
      id: 14,
      name: "GUNZ",
      logo: "/images/tokens/gunz.jpg",
      url: "https://lfj.gg/avalanche/swap?outputCurrency=0x26deBD39D5eD069770406FCa10A0E4f8d2c743eB",
    },
    {
      id: 15,
      name: "JOE",
      logo: "/images/tokens/joe.jpg",
      url: "https://lfj.gg/avalanche/swap?outputCurrency=0x6e84a6216eA6dACC71eE8E6b0a5B7322EEbC0fDd",
    },
  ]

  return (
    <div className="flex flex-col h-full">
      {/* Holdings List */}
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-2 gap-3 p-1">
          {holdings.map((holding) => {
            const content = (
              <div
                key={holding.id}
                className="flex items-center gap-2 p-2 border border-border/30 rounded bg-background/20 hover:border-primary/50 transition-colors"
              >
                {holding.logo ? (
                  <img src={holding.logo || "/placeholder.svg"} alt={holding.name} className="w-6 h-6 object-contain" />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                    <span className="text-[8px] text-primary font-mono">{holding.name[0]}</span>
                  </div>
                )}
                <span className="text-xs font-mono text-foreground/90 crt-glow">{holding.name}</span>
              </div>
            )

            return holding.url ? (
              <a
                key={holding.id}
                href={holding.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block cursor-pointer"
              >
                {content}
              </a>
            ) : (
              <div key={holding.id}>{content}</div>
            )
          })}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="border-t border-border/30 pt-2 mt-2">
        <p className="text-[9px] text-foreground/50 text-center italic">* Not investment suggestions</p>
      </div>
    </div>
  )
}
