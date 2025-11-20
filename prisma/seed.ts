import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Seed Holdings
  const holdings = [
    { name: "AVAX", logo: "/images/tokens/avax.png", url: "https://pharaoh.exchange/swap?to=AVAX&from=0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E", order: 1 },
    { name: "ggAVAX", logo: "/images/tokens/ggavax.png", url: "https://pharaoh.exchange/swap?to=0xA25EaF2906FA1a3a13EdAc9B9657108Af7B703e3&from=0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E", order: 2 },
    { name: "sAVAX", logo: "/images/tokens/savax.png", url: "https://pharaoh.exchange/swap?to=0x2b2C81e08f1Af8835a78Bb2A90AE924ACE0eA4bE&from=0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E", order: 3 },
    { name: "LINK", logo: "/images/tokens/link.png", url: "https://pharaoh.exchange/swap?to=0x5947BB275c521040051D82396192181b413227A3&from=0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E", order: 4 },
    { name: "WETH", logo: "/images/tokens/weth.png", url: "https://pharaoh.exchange/swap?to=0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB&from=0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E", order: 5 },
    { name: "BTC.b", logo: "/images/tokens/bitcoin.png", url: "https://pharaoh.exchange/swap?to=0x152b9d0FdC40C096757F570A51E494bd4b943E50&from=0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E", order: 6 },
    { name: "PHAR", logo: "/images/tokens/phar.png", url: "https://pharaoh.exchange/swap", order: 7 },
    { name: "ZAC", logo: "/images/tokens/zac.png", url: "https://electriccoin.co/zashi/", order: 8 },
    { name: "ARENA", logo: "/images/tokens/arena.png", url: "https://lfj.gg/avalanche/swap?outputCurrency=0xB8d7710f7d8349A506b75dD184F05777c82dAd0C", order: 9 },
    { name: "ART", logo: "/images/tokens/art.png", url: "https://lfj.gg/avalanche/swap?outputCurrency=0xF99516BC189AF00FF8EfFD5A1f2295B67d70a90e", order: 10 },
    { name: "BLAZE", logo: "/images/tokens/blaze.png", url: "https://lfj.gg/avalanche/swap?outputCurrency=0x297731Eb3CAB3834525fc9Ea061fd71d8f4645C9", order: 11 },
    { name: "QI", logo: "/images/tokens/qi.png", url: "https://lfj.gg/avalanche/swap?outputCurrency=0x8729438EB15e2C8B576fCc6AeCdA6A148776C0F5", order: 12 },
    { name: "MOANI", logo: "/images/tokens/moani.png", url: "https://lfj.gg/avalanche/swap?outputCurrency=0xEeC951BFDEB358371a19512C6c33CdD840d47DB0", order: 13 },
    { name: "GUNZ", logo: "/images/tokens/gunz.png", url: "https://lfj.gg/avalanche/swap?outputCurrency=0x26deBD39D5eD069770406FCa10A0E4f8d2c743eB", order: 14 },
    { name: "JOE", logo: "/images/tokens/joe.png", url: "https://lfj.gg/avalanche/swap?outputCurrency=0x6e84a6216eA6dACC71eE8E6b0a5B7322EEbC0fDd", order: 15 },
  ]

  for (const holding of holdings) {
    await prisma.holding.create({ data: holding })
  }
  console.log(`✅ Created ${holdings.length} holdings`)

  // Seed NFTs
  const nfts = [
    { name: "nochillio #564", image: "/images/nfts/nochillio-564.png", url: "https://salvor.io/collections/0x204b3ee3f9bdcde258ba3f74de76ea8eedf0a36a/564", isVisible: true },
    { name: "Steady #83", image: "/images/nfts/steady-83.png", url: "https://salvor.io/collections/0xcdab7d987f0198edb440d014ed1e71256a0e3e7a/83", isVisible: true },
    { name: "Jirasan #7859", image: "/images/nfts/jirasan-7859.png", url: "https://magiceden.io/item-details/ethereum/0x7fb2d396a3cc840f2c4213f044566ed400159b40/7859", isVisible: true },
    { name: "Memoria #1547", image: "/images/nfts/memoria-1547.png", url: "https://magiceden.io/item-details/ethereum/0xecaac696474c550e222b34891f8198836d6ce2e6/1547", isVisible: true },
    { name: "LilCoq #960", image: "/images/nfts/lilcoq-960.png", url: "https://salvor.io/collections/0x4cde6f2e6bdd0c4ee7bd0c9468188367e4e4952d/960", isVisible: true },
    { name: "DQN #3357", image: "/images/nfts/dqn-3357.png", url: "https://magiceden.io/item-details/avalanche/0x9b216c723f77a97abed00780865c070ad6e3dfb6/154", isVisible: true },
    { name: "Salvor #851", image: "/images/nfts/salvor-851.png", url: "https://salvor.io/collections/0xce4fee23ab35d0d9a4b6b644881ddd8adebeb300/851", isVisible: true },
    { name: "Bad Bunnies #1114", image: "/images/nfts/badbunnies-1114.png", url: "https://salvor.io/collections/0xdbc025824743aec2d44e4f1044329f4594998215/1114", isVisible: true },
    { name: "Koroshi #1960", image: "/images/nfts/koroshi-1960.png", url: "https://salvor.io/collections/0x33b7ee54f1a1fce84639528c409c3f3b7187084e/1960", isVisible: true },
    { name: "Koroshi #1961", image: "/images/nfts/koroshi-1961.png", url: "https://salvor.io/collections/0x33b7ee54f1a1fce84639528c409c3f3b7187084e/1961", isVisible: true },
    { name: "Koroshi #1219", image: "/images/nfts/koroshi-1219.png", url: "https://salvor.io/collections/0x33b7ee54f1a1fce84639528c409c3f3b7187084e/1219", isVisible: true },
  ]

  for (const nft of nfts) {
    await prisma.nFT.create({ data: nft })
  }
  console.log(`✅ Created ${nfts.length} NFTs`)

  console.log('✅ Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
