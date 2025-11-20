interface NFT {
  id: string
  name: string
  number: string
  image: string
  url: string
}

const nfts: NFT[] = [
  {
    id: "nochillio",
    name: "nochillio",
    number: "#564",
    image: "/images/nfts/nochillio-564.png",
    url: "https://salvor.io/collections/0x204b3ee3f9bdcde258ba3f74de76ea8eedf0a36a/564",
  },
  {
    id: "steady",
    name: "Steady",
    number: "#83",
    image: "/images/nfts/steady-83.png",
    url: "https://salvor.io/collections/0xcdab7d987f0198edb440d014ed1e71256a0e3e7a/83",
  },
  {
    id: "jirasan",
    name: "Jirasan",
    number: "#7859",
    image: "/images/nfts/jirasan-7859.png",
    url: "https://magiceden.io/item-details/ethereum/0x7fb2d396a3cc840f2c4213f044566ed400159b40/7859",
  },
  {
    id: "memoria",
    name: "Memoria",
    number: "#1547",
    image: "/images/nfts/memoria-1547.png",
    url: "https://magiceden.io/item-details/ethereum/0xecaac696474c550e222b34891f8198836d6ce2e6/1547",
  },
  {
    id: "lilcoq",
    name: "LilCoq",
    number: "#960",
    image: "/images/nfts/lilcoq-960.png",
    url: "https://salvor.io/collections/0x4cde6f2e6bdd0c4ee7bd0c9468188367e4e4952d/960",
  },
  {
    id: "dqn",
    name: "DQN",
    number: "#3357",
    image: "/images/nfts/dqn-3357.png",
    url: "https://magiceden.io/item-details/avalanche/0x9b216c723f77a97abed00780865c070ad6e3dfb6/154",
  },
  {
    id: "salvor",
    name: "Salvor",
    number: "#851",
    image: "/images/nfts/salvor-851.png",
    url: "https://salvor.io/collections/0xce4fee23ab35d0d9a4b6b644881ddd8adebeb300/851",
  },
  {
    id: "badbunnies",
    name: "Bad Bunnies",
    number: "#1114",
    image: "/images/nfts/badbunnies-1114.png",
    url: "https://salvor.io/collections/0xdbc025824743aec2d44e4f1044329f4594998215/1114",
  },
  {
    id: "koroshi",
    name: "Koroshi",
    number: "#1960",
    image: "/images/nfts/koroshi-1960.png",
    url: "https://salvor.io/collections/0x33b7ee54f1a1fce84639528c409c3f3b7187084e/1960",
  },
  {
    id: "koroshi",
    name: "Koroshi",
    number: "#1961",
    image: "/images/nfts/koroshi-1961.png",
    url: "https://salvor.io/collections/0x33b7ee54f1a1fce84639528c409c3f3b7187084e/1961",
  },
  {
    id: "koroshi",
    name: "Koroshi",
    number: "#1219",
    image: "/images/nfts/koroshi-1219.png",
    url: "https://salvor.io/collections/0x33b7ee54f1a1fce84639528c409c3f3b7187084e/1219",
  },
  {
    id: "koroshi",
    name: "Koroshi",
    number: "#1524",
    image: "/images/nfts/koroshi-1524.png",
    url: "https://salvor.io/collections/0x33b7ee54f1a1fce84639528c409c3f3b7187084e/1524",
  },
  {
    id: "koroshi",
    name: "Koroshi",
    number: "#925",
    image: "/images/nfts/koroshi-925.png",
    url: "https://salvor.io/collections/0x33b7ee54f1a1fce84639528c409c3f3b7187084e/925",
  },
  {
    id: "koroshi",
    name: "Koroshi",
    number: "#481",
    image: "/images/nfts/koroshi-481.png",
    url: "https://salvor.io/collections/0x33b7ee54f1a1fce84639528c409c3f3b7187084e/481",
  },
  {
    id: "koroshi",
    name: "Koroshi",
    number: "#406",
    image: "/images/nfts/koroshi-406.png",
    url: "https://salvor.io/collections/0x33b7ee54f1a1fce84639528c409c3f3b7187084e/406",
  },
  {
    id: "koroshi",
    name: "Koroshi",
    number: "#65",
    image: "/images/nfts/koroshi-65.png",
    url: "https://salvor.io/collections/0x33b7ee54f1a1fce84639528c409c3f3b7187084e/65",
  },
  {
    id: "koroshi",
    name: "Koroshi",
    number: "#1136",
    image: "/images/nfts/koroshi-1136.png",
    url: "https://salvor.io/collections/0x33b7ee54f1a1fce84639528c409c3f3b7187084e/1136",
  },
]

export default function NFTsContent() {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-1 overflow-y-auto p-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 auto-rows-max">
        {nfts.map((nft) => (
          <a
            key={nft.id}
            href={nft.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group border border-border bg-background/50 rounded hover:border-primary transition-all duration-200 overflow-hidden flex flex-col"
          >
            <div className="relative w-full aspect-square overflow-hidden">
              <img
                src={nft.image || "/placeholder.svg"}
                alt={`${nft.name} ${nft.number}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              />
            </div>
            <div className="p-1.5 text-center">
              <div className="text-[10px] text-foreground crt-glow truncate">
                {nft.name} {nft.number}
              </div>
            </div>
          </a>
        ))}
      </div>
      <div className="border-t border-border p-2 text-center">
        <p className="text-[9px] text-foreground/60 crt-glow">NFT Collection • 8 Items</p>
      </div>
    </div>
  )
}
