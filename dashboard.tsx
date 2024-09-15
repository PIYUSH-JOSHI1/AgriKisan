import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { AlertCircle, Droplet, Thermometer, Wind, Cloud, Bug, Sprout, Share2, BarChart2, User, Settings, LogOut } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Dashboard() {
  const [soilMoisture, setSoilMoisture] = useState(65)
  const [temperature, setTemperature] = useState(28)
  const [windSpeed, setWindSpeed] = useState(12)
  const [cropHealth, setCropHealth] = useState(85)
  const [selectedCrop, setSelectedCrop] = useState("wheat")
  const [isEditingProfile, setIsEditingProfile] = useState(false)

  const [userProfile, setUserProfile] = useState({
    name: "Rajesh Kumar",
    email: "rajesh@example.com",
    location: "Punjab, India",
    farmSize: "5 hectares",
    bio: "Third-generation farmer passionate about sustainable agriculture and new farming technologies."
  })

  const handleProfileUpdate = (event: React.FormEvent) => {
    event.preventDefault()
    setIsEditingProfile(false)
    // Here you would typically send the updated profile to your backend
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <nav className="bg-white dark:bg-gray-800 shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-green-600">AgriKisan</h1>
          <div className="flex items-center space-x-4">
            <Select defaultValue={selectedCrop} onValueChange={setSelectedCrop}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select crop" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="wheat">Wheat</SelectItem>
                <SelectItem value="rice">Rice</SelectItem>
                <SelectItem value="cotton">Cotton</SelectItem>
                <SelectItem value="sugarcane">Sugarcane</SelectItem>
              </SelectContent>
            </Select>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/avatars/farmer.png" alt="@rajeshkumar" />
                    <AvatarFallback>RK</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{userProfile.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">{userProfile.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setIsEditingProfile(true)}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Edit Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>

      <main className="container mx-auto p-4">
        {isEditingProfile ? (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Edit Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProfileUpdate} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" value={userProfile.name} onChange={(e) => setUserProfile({...userProfile, name: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" value={userProfile.email} onChange={(e) => setUserProfile({...userProfile, email: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" value={userProfile.location} onChange={(e) => setUserProfile({...userProfile, location: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="farmSize">Farm Size</Label>
                    <Input id="farmSize" value={userProfile.farmSize} onChange={(e) => setUserProfile({...userProfile, farmSize: e.target.value})} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea id="bio" value={userProfile.bio} onChange={(e) => setUserProfile({...userProfile, bio: e.target.value})} />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setIsEditingProfile(false)}>Cancel</Button>
                  <Button type="submit">Save Changes</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        ) : null}

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Soil Moisture</CardTitle>
              <Droplet className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{soilMoisture}%</div>
              <Progress value={soilMoisture} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-2">Optimal range: 50-70%</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Temperature</CardTitle>
              <Thermometer className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{temperature}°C</div>
              <Progress value={temperature} max={50} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-2">Optimal range: 20-30°C</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Wind Speed</CardTitle>
              <Wind className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{windSpeed} km/h</div>
              <Progress value={windSpeed} max={50} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-2">Safe range: 0-20 km/h</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Crop Health</CardTitle>
              <Sprout className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{cropHealth}%</div>
              <Progress value={cropHealth} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-2">Based on satellite imagery</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="recommendations" className="space-y-4">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-4 lg:grid-cols-5 h-auto">
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
            <TabsTrigger value="forecast">7-Day Forecast</TabsTrigger>
            <TabsTrigger value="historical">Historical Data</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
          </TabsList>
          <TabsContent value="recommendations">
            <Card>
              <CardHeader>
                <CardTitle>Today's Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Apply irrigation in the evening to reduce water loss due to evaporation</li>
                  <li>Consider adding organic mulch to retain soil moisture</li>
                  <li>Monitor for signs of heat stress in your {selectedCrop} crop</li>
                  <li>Apply a foliar spray of micronutrients to boost crop health</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="alerts">
            <Card>
              <CardHeader>
                <CardTitle>Active Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-yellow-600">
                    <AlertCircle className="h-4 w-4" />
                    <span>Potential water stress conditions in the next 3 days</span>
                  </div>
                  <div className="flex items-center space-x-2 text-red-600">
                    <Bug className="h-4 w-4" />
                    <span>Increased risk of pest infestation - inspect your {selectedCrop} crop regularly</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="forecast">
            <Card>
              <CardHeader>
                <CardTitle>7-Day Weather Forecast</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-2 text-center">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                    <div key={day} className="flex flex-col items-center">
                      <span className="font-medium">{day}</span>
                      {index % 2 === 0 ? (
                        <Thermometer className="h-8 w-8 my-2 text-red-500" />
                      ) : (
                        <Cloud className="h-8 w-8 my-2 text-blue-500" />
                      )}
                      <span className="text-sm">{25 + index}°C</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="historical">
            <Card>
              <CardHeader>
                <CardTitle>Historical Data Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-center justify-center border-2 border-dashed rounded-md">
                  <BarChart2 className="h-16 w-16 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Historical data visualization would be displayed here, showing trends in soil moisture, temperature, and {selectedCrop} yields over time.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="community">
            <Card>
              <CardHeader>
                <CardTitle>Community Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <Share2 className="h-5 w-5 mt-1 flex-shrink-0 text-green-500" />
                    <div>
                      <p className="font-medium">Neighbor Amit shared a tip:</p>
                      <p className="text-sm text-muted-foreground">"I've had success with intercropping {selectedCrop} and pulses this season. It's improving soil health and yields!"</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <Share2 className="h-5 w-5 mt-1 flex-shrink-0 text-green-500" />
                    <div>
                      <p className="font-medium">Local expert advice:</p>
                      <p className="text-sm text-muted-foreground">"Consider adopting conservation tillage practices to improve soil structure and water retention for your {selectedCrop} crop."</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-8 space-y-4">
          <h2 className="text-2xl font-bold">Additional Features</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Pest and Disease Prediction</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">AI-powered analysis predicts a 15% chance of fungal infection in your {selectedCrop} crop in the next week. Consider preventive measures.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Water Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Based on current soil moisture and weather forecast, optimal irrigation for your {selectedCrop} is scheduled for tomorrow evening.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Crop Yield Estimation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Current estimates suggest a 10% increase in {selectedCrop} yield compared to last season, based on satellite imagery and historical data.</p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button className="flex items-center">
            <BarChart2 className="mr-2 h-4 w-4" /> View Detailed Analytics
          </Button>
          <Button variant="outline" className="flex items-center">
            <Share2 className="mr-2 h-4 w-4" /> Community Forum
          </Button>
          <Button variant="secondary" className="flex items-center">
            <Cloud className="mr-2 h-4 w-4" /> Sync Offline Data
          </Button>
        </div>
      </main>

      <footer className="bg-white dark:bg-gray-800 shadow-md mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>© 2024 AgriKisan. All rights reserved. | <a href="#" className="underline">Privacy Policy</a> | <a href="#" className="underline">Terms of Service</a></p>
          <p className="mt-2">Powered by Earth Observation data and local IoT sensors.</p>
        </div>
      </footer>
    </div>
  )
}
