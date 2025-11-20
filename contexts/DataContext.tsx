"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

interface NFT {
  id: string
  name: string
  image: string | null
  url: string | null
}

interface Holding {
  id: string
  name: string
  logo: string | null
  url: string | null
}

interface DataContextType {
  nfts: NFT[]
  holdings: Holding[]
  isLoading: boolean
}

const DataContext = createContext<DataContextType>({
  nfts: [],
  holdings: [],
  isLoading: true,
})

export function DataProvider({ children }: { children: ReactNode }) {
  const [nfts, setNfts] = useState<NFT[]>([])
  const [holdings, setHoldings] = useState<Holding[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [nftsRes, holdingsRes] = await Promise.all([
          fetch("/api/nfts"),
          fetch("/api/holdings"),
        ])

        const [nftsData, holdingsData] = await Promise.all([
          nftsRes.json(),
          holdingsRes.json(),
        ])

        setNfts(nftsData)
        setHoldings(holdingsData)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <DataContext.Provider value={{ nfts, holdings, isLoading }}>
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  return useContext(DataContext)
}
