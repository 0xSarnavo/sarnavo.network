"use client"

import { useState, useEffect } from "react"
import { useSession, signIn, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Trash2, Plus, RefreshCw, LogOut, Wallet } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function AdminPage() {
  const { data: session, status } = useSession()
  const { toast } = useToast()
  
  // Data States
  const [holdings, setHoldings] = useState<any[]>([])
  const [nfts, setNfts] = useState<any[]>([])
  const [achievements, setAchievements] = useState<any[]>([])
  const [projects, setProjects] = useState<any[]>([])
  const [logs, setLogs] = useState<any[]>([])
  
  const [loading, setLoading] = useState(false)

  // Forms
  const [newHolding, setNewHolding] = useState({ name: "", logo: "", url: "", order: 0 })
  const [newNft, setNewNft] = useState({ name: "", image: "", url: "", tokenId: "", contractAddress: "" })
  const [newAchievement, setNewAchievement] = useState({ title: "", content: "", date: "", order: 0 })
  const [newProject, setNewProject] = useState({ title: "", content: "", link: "", order: 0 })
  const [newLog, setNewLog] = useState({ title: "", content: "", date: "", order: 0 })
  
  const [walletAddress, setWalletAddress] = useState("")
  const [scannedNfts, setScannedNfts] = useState<any[]>([])
  const [scanChain, setScanChain] = useState("ETH")

  useEffect(() => {
    if (session?.user?.email === "sarnavoss.dev@gmail.com") {
      fetchData()
    }
  }, [session])

  const fetchData = async () => {
    await Promise.all([
      fetchHoldings(),
      fetchNfts(),
      fetchAchievements(),
      fetchProjects(),
      fetchLogs()
    ])
  }

  const fetchHoldings = async () => { const res = await fetch("/api/holdings"); if (res.ok) setHoldings(await res.json()) }
  const fetchNfts = async () => { const res = await fetch("/api/nfts"); if (res.ok) setNfts(await res.json()) }
  const fetchAchievements = async () => { const res = await fetch("/api/achievements"); if (res.ok) setAchievements(await res.json()) }
  const fetchProjects = async () => { const res = await fetch("/api/projects"); if (res.ok) setProjects(await res.json()) }
  const fetchLogs = async () => { const res = await fetch("/api/logs"); if (res.ok) setLogs(await res.json()) }

  // Generic Handlers
  const handleAdd = async (endpoint: string, data: any, refresh: () => void, reset: () => void) => {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (res.ok) {
      toast({ title: "Success", description: "Item added" })
      refresh()
      reset()
    } else {
      toast({ title: "Error", description: "Failed to add item", variant: "destructive" })
    }
  }

  const handleDelete = async (endpoint: string, id: string, refresh: () => void) => {
    const res = await fetch(`${endpoint}?id=${id}`, { method: "DELETE" })
    if (res.ok) refresh()
  }

  const handleScanWallet = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/wallet/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address: walletAddress, chain: scanChain }),
      })
      const data = await res.json()
      if (data.nfts) {
        setScannedNfts(data.nfts)
        toast({ title: "Scan Complete", description: `Found ${data.nfts.length} NFTs` })
      } else {
        toast({ title: "Error", description: data.error, variant: "destructive" })
      }
    } catch (e) {
      toast({ title: "Error", description: "Failed to scan wallet", variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  if (status === "loading") return <div className="p-10 text-center">Loading...</div>

  if (!session || session.user?.email !== "sarnavoss.dev@gmail.com") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <Card className="w-[350px] border-primary/50 bg-black/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-center crt-glow text-primary">SARNAVO.SYS ADMIN</CardTitle>
          </CardHeader>
          <CardContent>
            {session ? (
              <div className="text-center space-y-4">
                <p className="text-red-500">Access Denied: {session.user?.email}</p>
                <Button onClick={() => signOut()} variant="outline">Logout</Button>
              </div>
            ) : (
              <Button onClick={() => signIn("google")} className="w-full crt-glow" variant="outline">
                Login with Google
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-foreground p-4 md:p-8 font-mono">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex justify-between items-center border-b border-primary/30 pb-4">
          <h1 className="text-2xl text-primary crt-glow">ADMIN CONSOLE</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{session.user?.email}</span>
            <Button variant="ghost" size="sm" onClick={() => signOut()}>
              <LogOut className="w-4 h-4 mr-2" /> Logout
            </Button>
          </div>
        </div>

        <Tabs defaultValue="holdings" className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-muted/20">
            <TabsTrigger value="holdings">Holdings</TabsTrigger>
            <TabsTrigger value="nfts">NFTs</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="logs">Logs</TabsTrigger>
          </TabsList>

          {/* HOLDINGS TAB */}
          <TabsContent value="holdings" className="space-y-4 mt-4">
            <Card className="bg-black/40 border-primary/20">
              <CardHeader><CardTitle>Add Holding</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input value={newHolding.name} onChange={(e) => setNewHolding({ ...newHolding, name: e.target.value })} placeholder="Name" />
                  <Input value={newHolding.logo} onChange={(e) => setNewHolding({ ...newHolding, logo: e.target.value })} placeholder="Logo URL" />
                  <Input value={newHolding.url} onChange={(e) => setNewHolding({ ...newHolding, url: e.target.value })} placeholder="Link URL" />
                  <Input type="number" value={newHolding.order} onChange={(e) => setNewHolding({ ...newHolding, order: parseInt(e.target.value) })} placeholder="Order" />
                </div>
                <Button onClick={() => handleAdd("/api/holdings", newHolding, fetchHoldings, () => setNewHolding({ name: "", logo: "", url: "", order: 0 }))} className="w-full"><Plus className="w-4 h-4 mr-2" /> Add</Button>
              </CardContent>
            </Card>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {holdings.map((h) => (
                <Card key={h.id} className="bg-muted/10 border-border/50">
                  <CardContent className="p-4 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      {h.logo && <img src={h.logo} className="w-6 h-6" />}
                      <span>{h.name}</span>
                    </div>
                    <Button variant="destructive" size="icon" onClick={() => handleDelete("/api/holdings", h.id, fetchHoldings)}><Trash2 className="w-4 h-4" /></Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* NFTS TAB */}
          <TabsContent value="nfts" className="space-y-6 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-black/40 border-primary/20">
                <CardHeader><CardTitle>Manual Add</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <Input value={newNft.name} onChange={(e) => setNewNft({ ...newNft, name: e.target.value })} placeholder="Name" />
                  <Input value={newNft.image} onChange={(e) => setNewNft({ ...newNft, image: e.target.value })} placeholder="Image URL" />
                  <Input value={newNft.url} onChange={(e) => setNewNft({ ...newNft, url: e.target.value })} placeholder="Link URL" />
                  <Button onClick={() => handleAdd("/api/nfts", newNft, fetchNfts, () => setNewNft({ name: "", image: "", url: "", tokenId: "", contractAddress: "" }))} className="w-full"><Plus className="w-4 h-4 mr-2" /> Add</Button>
                </CardContent>
              </Card>
              <Card className="bg-black/40 border-primary/20">
                <CardHeader><CardTitle>Scan Wallet</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <Input value={walletAddress} onChange={(e) => setWalletAddress(e.target.value)} placeholder="0x..." />
                  <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={scanChain} onChange={(e) => setScanChain(e.target.value)}>
                    <option value="ETH">Ethereum</option>
                    <option value="AVAX">Avalanche</option>
                    <option value="POLYGON">Polygon</option>
                  </select>
                  <Button onClick={handleScanWallet} disabled={loading} className="w-full">{loading ? <RefreshCw className="animate-spin mr-2" /> : <Wallet className="mr-2" />} Scan</Button>
                </CardContent>
              </Card>
            </div>
            {scannedNfts.length > 0 && (
              <Card className="bg-primary/5 border-primary/30">
                <CardHeader><CardTitle>Scan Results</CardTitle></CardHeader>
                <CardContent>
                  <div className="grid grid-cols-4 gap-4 max-h-[400px] overflow-y-auto">
                    {scannedNfts.map((nft, idx) => (
                      <div key={idx} className="border p-2 rounded bg-black/50">
                        <img src={nft.image || "/placeholder.svg"} className="w-full aspect-square object-cover mb-2" />
                        <div className="text-xs truncate font-bold">{nft.name}</div>
                        <Button size="sm" className="w-full mt-2" onClick={() => handleAdd("/api/nfts", { name: nft.name, image: nft.image, url: `https://opensea.io/assets/${nft.contractAddress}/${nft.tokenId}`, tokenId: nft.tokenId, contractAddress: nft.contractAddress, source: "ALCHEMY" }, fetchNfts, () => {})}>Import</Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
            <div className="grid grid-cols-5 gap-4">
              {nfts.map((nft) => (
                <div key={nft.id} className="border p-2 rounded bg-muted/10 relative group">
                  <img src={nft.image || "/placeholder.svg"} className="w-full aspect-square object-cover mb-2" />
                  <div className="text-xs truncate font-bold">{nft.name}</div>
                  <Button variant="destructive" size="icon" className="absolute top-1 right-1 opacity-0 group-hover:opacity-100" onClick={() => handleDelete("/api/nfts", nft.id, fetchNfts)}><Trash2 className="w-3 h-3" /></Button>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* ACHIEVEMENTS TAB */}
          <TabsContent value="achievements" className="space-y-4 mt-4">
            <Card className="bg-black/40 border-primary/20">
              <CardHeader><CardTitle>Add Achievement</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <Input value={newAchievement.title} onChange={(e) => setNewAchievement({ ...newAchievement, title: e.target.value })} placeholder="Title" />
                <Textarea value={newAchievement.content} onChange={(e) => setNewAchievement({ ...newAchievement, content: e.target.value })} placeholder="Content" />
                <Input value={newAchievement.date} onChange={(e) => setNewAchievement({ ...newAchievement, date: e.target.value })} placeholder="Date (e.g. 2023)" />
                <Button onClick={() => handleAdd("/api/achievements", newAchievement, fetchAchievements, () => setNewAchievement({ title: "", content: "", date: "", order: 0 }))} className="w-full"><Plus className="w-4 h-4 mr-2" /> Add</Button>
              </CardContent>
            </Card>
            <div className="space-y-2">
              {achievements.map((item) => (
                <Card key={item.id} className="bg-muted/10 border-border/50">
                  <CardContent className="p-4 flex justify-between items-start">
                    <div>
                      <div className="font-bold">{item.title} <span className="text-xs text-muted-foreground">({item.date})</span></div>
                      <div className="text-sm text-muted-foreground">{item.content}</div>
                    </div>
                    <Button variant="destructive" size="icon" onClick={() => handleDelete("/api/achievements", item.id, fetchAchievements)}><Trash2 className="w-4 h-4" /></Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* PROJECTS TAB */}
          <TabsContent value="projects" className="space-y-4 mt-4">
            <Card className="bg-black/40 border-primary/20">
              <CardHeader><CardTitle>Add Project</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <Input value={newProject.title} onChange={(e) => setNewProject({ ...newProject, title: e.target.value })} placeholder="Title" />
                <Textarea value={newProject.content} onChange={(e) => setNewProject({ ...newProject, content: e.target.value })} placeholder="Content" />
                <Input value={newProject.link} onChange={(e) => setNewProject({ ...newProject, link: e.target.value })} placeholder="Link URL" />
                <Button onClick={() => handleAdd("/api/projects", newProject, fetchProjects, () => setNewProject({ title: "", content: "", link: "", order: 0 }))} className="w-full"><Plus className="w-4 h-4 mr-2" /> Add</Button>
              </CardContent>
            </Card>
            <div className="space-y-2">
              {projects.map((item) => (
                <Card key={item.id} className="bg-muted/10 border-border/50">
                  <CardContent className="p-4 flex justify-between items-start">
                    <div>
                      <div className="font-bold">{item.title}</div>
                      <div className="text-sm text-muted-foreground">{item.content}</div>
                      {item.link && <a href={item.link} target="_blank" className="text-xs text-primary hover:underline">{item.link}</a>}
                    </div>
                    <Button variant="destructive" size="icon" onClick={() => handleDelete("/api/projects", item.id, fetchProjects)}><Trash2 className="w-4 h-4" /></Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* LOGS TAB */}
          <TabsContent value="logs" className="space-y-4 mt-4">
            <Card className="bg-black/40 border-primary/20">
              <CardHeader><CardTitle>Add Log</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <Input value={newLog.title} onChange={(e) => setNewLog({ ...newLog, title: e.target.value })} placeholder="Title" />
                <Textarea value={newLog.content} onChange={(e) => setNewLog({ ...newLog, content: e.target.value })} placeholder="Content" />
                <Input value={newLog.date} onChange={(e) => setNewLog({ ...newLog, date: e.target.value })} placeholder="Date" />
                <Button onClick={() => handleAdd("/api/logs", newLog, fetchLogs, () => setNewLog({ title: "", content: "", date: "", order: 0 }))} className="w-full"><Plus className="w-4 h-4 mr-2" /> Add</Button>
              </CardContent>
            </Card>
            <div className="space-y-2">
              {logs.map((item) => (
                <Card key={item.id} className="bg-muted/10 border-border/50">
                  <CardContent className="p-4 flex justify-between items-start">
                    <div>
                      <div className="font-bold">{item.title} <span className="text-xs text-muted-foreground">({item.date})</span></div>
                      <div className="text-sm text-muted-foreground">{item.content}</div>
                    </div>
                    <Button variant="destructive" size="icon" onClick={() => handleDelete("/api/logs", item.id, fetchLogs)}><Trash2 className="w-4 h-4" /></Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

        </Tabs>
      </div>
    </div>
  )
}
