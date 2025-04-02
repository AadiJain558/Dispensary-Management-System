import React, { useState, useRef, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar'
import { Badge } from '../components/ui/badge'
import { Separator } from '../components/ui/separator'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Calendar, Building2, Edit, LogOut, User, Lock, Settings, Bell } from 'lucide-react'

const Myprofile = () => {
  const [activeTab, setActiveTab] = useState("profile")
  const [isEditing, setIsEditing] = useState(false)
  const [isScrolling, setIsScrolling] = useState(false)
  
  // Refs for each section
  const profileRef = useRef(null)
  const appointmentsRef = useRef(null)
  const settingsRef = useRef(null)
  
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    dob: "1990-01-15",
    address: "123 Main Street, New York, NY 10001",
    medicalConditions: "None",
    allergies: "Penicillin",
    emergencyContact: "Jane Doe (+1 555-987-6543)",
    profileImage: null
  })

  // Mock appointments data
  const appointments = [
    { id: 1, date: "2024-04-10", time: "10:00 AM", doctor: "Dr. Smith", status: "completed", department: "Cardiology" },
    { id: 2, date: "2024-04-15", time: "2:30 PM", doctor: "Dr. Johnson", status: "upcoming", department: "Neurology" },
    { id: 3, date: "2024-04-22", time: "11:15 AM", doctor: "Dr. Williams", status: "upcoming", department: "Orthopedics" },
  ]

  const scrollToSection = (section) => {
    setActiveTab(section)
    setIsScrolling(true)
    
    let ref = null
    switch(section) {
      case 'profile':
        ref = profileRef
        break
      case 'appointments':
        ref = appointmentsRef
        break
      case 'settings':
        ref = settingsRef
        break
      default:
        ref = profileRef
    }
    
    if (ref && ref.current) {
      window.scrollTo({
        top: ref.current.offsetTop - 100, // Account for fixed header
        behavior: 'smooth'
      })
      
      // Set timeout to prevent handling scroll events during programmatic scrolling
      setTimeout(() => setIsScrolling(false), 1000)
    }
  }

  // Update active tab based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (isScrolling) return
      
      const scrollPosition = window.scrollY + 100 // Add offset for better UX
      
      if (settingsRef.current && scrollPosition >= settingsRef.current.offsetTop - 100) {
        setActiveTab('settings')
      } else if (appointmentsRef.current && scrollPosition >= appointmentsRef.current.offsetTop - 100) {
        setActiveTab('appointments')
      } else if (profileRef.current && scrollPosition >= profileRef.current.offsetTop - 100) {
        setActiveTab('profile')
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isScrolling])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setUserData(prev => ({ ...prev, [name]: value }))
  }

  const handleSaveProfile = () => {
    // Here you would typically send the updated data to your API
    console.log("Saving profile data:", userData)
    setIsEditing(false)
  }

  const handleChangePassword = (e) => {
    e.preventDefault()
    // Password change logic would go here
    console.log("Password change requested")
  }

  const getInitials = (name) => {
    return name
      .split(" ")
      .map(part => part[0])
      .join("")
      .toUpperCase()
  }

  return (
    <div className="container mx-auto px-4 py-10 mt-8">
      {/* Navigation tabs - Styled to match the screenshot */}
      <div className="fixed top-[60px] left-0 right-0 bg-background border-b border-border z-10">
        <div className="container max-w-screen-xl mx-auto">
          <div className="flex justify-center">
            <div className="flex py-2 px-4">
              <button
                className={`flex items-center px-6 py-2 text-sm font-medium transition-colors ${
                  activeTab === 'profile' 
                    ? 'text-primary' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                onClick={() => scrollToSection('profile')}
              >
                <User className="mr-2 h-4 w-4" />
                Profile
              </button>
              <button
                className={`flex items-center px-6 py-2 text-sm font-medium transition-colors ${
                  activeTab === 'appointments' 
                    ? 'text-primary' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                onClick={() => scrollToSection('appointments')}
              >
                <Calendar className="mr-2 h-4 w-4" />
                Appointments
              </button>
              <button
                className={`flex items-center px-6 py-2 text-sm font-medium transition-colors ${
                  activeTab === 'settings' 
                    ? 'text-primary' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                onClick={() => scrollToSection('settings')}
              >
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto pt-14">
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="flex-shrink-0">
            <Avatar className="h-24 w-24 border-2 border-primary">
              {userData.profileImage ? (
                <AvatarImage src={userData.profileImage} alt={userData.name} />
              ) : (
                <AvatarFallback className="text-xl">{getInitials(userData.name)}</AvatarFallback>
              )}
            </Avatar>
          </div>
          <div className="flex-grow">
            <h1 className="text-3xl font-bold text-foreground">{userData.name}</h1>
            <p className="text-muted-foreground">{userData.email}</p>
            <p className="text-muted-foreground">{userData.phone}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge variant="secondary">Patient</Badge>
              <Badge variant="success">Active</Badge>
            </div>
          </div>
          <div className="flex-shrink-0 flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
            <Button variant="outline" size="sm">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>

        {/* Profile Section */}
        <div id="profile-section" ref={profileRef} className="mb-10">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                View and manage your personal information and medical details
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Full Name</label>
                    <Input 
                      name="name" 
                      value={userData.name} 
                      onChange={handleInputChange} 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email Address</label>
                    <Input 
                      name="email" 
                      type="email" 
                      value={userData.email} 
                      onChange={handleInputChange} 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Phone Number</label>
                    <Input 
                      name="phone" 
                      value={userData.phone} 
                      onChange={handleInputChange} 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Date of Birth</label>
                    <Input 
                      name="dob" 
                      type="date" 
                      value={userData.dob} 
                      onChange={handleInputChange} 
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium">Address</label>
                    <Input 
                      name="address" 
                      value={userData.address} 
                      onChange={handleInputChange} 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Medical Conditions</label>
                    <Input 
                      name="medicalConditions" 
                      value={userData.medicalConditions} 
                      onChange={handleInputChange} 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Allergies</label>
                    <Input 
                      name="allergies" 
                      value={userData.allergies} 
                      onChange={handleInputChange} 
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium">Emergency Contact</label>
                    <Input 
                      name="emergencyContact" 
                      value={userData.emergencyContact} 
                      onChange={handleInputChange} 
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Full Name</p>
                      <p>{userData.name}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Email Address</p>
                      <p>{userData.email}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Phone Number</p>
                      <p>{userData.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Date of Birth</p>
                      <p>{new Date(userData.dob).toLocaleDateString()}</p>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-sm font-medium text-muted-foreground">Address</p>
                      <p>{userData.address}</p>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-medium mb-4">Medical Information</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Medical Conditions</p>
                        <p>{userData.medicalConditions}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Allergies</p>
                        <p>{userData.allergies}</p>
                      </div>
                      <div className="md:col-span-2">
                        <p className="text-sm font-medium text-muted-foreground">Emergency Contact</p>
                        <p>{userData.emergencyContact}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
            {isEditing && (
              <CardFooter className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                <Button onClick={handleSaveProfile}>Save Changes</Button>
              </CardFooter>
            )}
          </Card>
        </div>

        {/* Appointments Section */}
        <div id="appointments-section" ref={appointmentsRef} className="mb-10">
          <Card>
            <CardHeader>
              <CardTitle>My Appointments</CardTitle>
              <CardDescription>
                View and manage your upcoming and past appointments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {appointments.length > 0 ? (
                  appointments.map(appointment => (
                    <div key={appointment.id} className="flex flex-col md:flex-row gap-4 p-4 border rounded-lg">
                      <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
                        <Building2 className="h-6 w-6" />
                      </div>
                      <div className="flex-grow">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                          <h3 className="font-medium">{appointment.doctor}</h3>
                          <Badge variant={appointment.status === 'completed' ? 'secondary' : 'success'}>
                            {appointment.status === 'completed' ? 'Completed' : 'Upcoming'}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{appointment.department}</p>
                        <div className="mt-2 flex items-center text-sm">
                          <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>
                            {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                          </span>
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        <Button variant="outline" size="sm">View Details</Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6">
                    <p className="text-muted-foreground">You don't have any appointments yet.</p>
                    <Button className="mt-4">Schedule an Appointment</Button>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule New Appointment
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Settings Section */}
        <div id="settings-section" ref={settingsRef}>
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>
                Manage your account settings and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4 flex items-center">
                  <Lock className="mr-2 h-5 w-5" />
                  Password
                </h3>
                <form onSubmit={handleChangePassword} className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="text-sm font-medium">Current Password</label>
                      <Input type="password" placeholder="••••••••" />
                    </div>
                    <div className="md:col-span-2">
                      <Separator />
                    </div>
                    <div>
                      <label className="text-sm font-medium">New Password</label>
                      <Input type="password" placeholder="••••••••" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Confirm Password</label>
                      <Input type="password" placeholder="••••••••" />
                    </div>
                  </div>
                  <Button type="submit">Change Password</Button>
                </form>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-medium mb-4 flex items-center">
                  <Bell className="mr-2 h-5 w-5" />
                  Notifications
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-muted-foreground">Receive emails for appointments and updates</p>
                    </div>
                    <div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                      </label>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">SMS Notifications</p>
                      <p className="text-sm text-muted-foreground">Receive text messages for appointment reminders</p>
                    </div>
                    <div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-medium mb-4 flex items-center text-destructive">
                  <span>Danger Zone</span>
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Once you delete your account, there is no going back. Please be certain.
                </p>
                <Button variant="destructive">Delete Account</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Myprofile
