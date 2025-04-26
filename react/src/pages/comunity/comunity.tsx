import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Users,
  MessageSquare,
  Calendar,
  TrendingUp,
  Search,
  Tag,
  Award,
  Heart,
  ThumbsUp,
  MessageCircle,
  Clock,
  MapPin,
  Globe,
  Bookmark,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function CommunityPage() {
  return (
    <div className="container max-w-6xl pb-10 pt-16 px-4 mx-auto">
      <div className="space-y-8">
        {/* Asosiy Qism */}
        <div className="relative rounded-xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/60 mix-blend-multiply" />
          <div className="relative z-10 px-6 py-16 md:py-24 md:px-10 flex flex-col items-center text-center">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
              Dasturchilar Hamjamiyatiga Qo'shiling
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mb-6">
              Hamkasblaringiz bilan bog'laning, bilim almashing, muhokamalarda
              qatnashing va qo'llab-quvvatlovchi muhitda birga rivojlanmiz.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" variant="secondary">
                Hozir Ro'yxatdan O'ting
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 text-white border-white/20 hover:bg-white/20"
              >
                Guruhlarni Ko'rish
              </Button>
            </div>
            <div className="flex items-center gap-1 mt-8">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Avatar key={i} className="border-2 border-primary">
                    <AvatarImage
                      src={`/placeholder.svg?height=40&width=40&text=${i}`}
                      alt="Hamjamiyat a'zosi"
                    />
                    <AvatarFallback>U{i}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <span className="text-white/90 ml-4">
                25,000+ dasturchiga qo'shiling
              </span>
            </div>
          </div>
        </div>

        {/* Statistika */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-muted/50">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <Users className="h-8 w-8 text-primary mb-2" />
                <span className="text-2xl font-bold">25K+</span>
                <span className="text-sm text-muted-foreground">A'zolar</span>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-muted/50">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <MessageSquare className="h-8 w-8 text-primary mb-2" />
                <span className="text-2xl font-bold">150K+</span>
                <span className="text-sm text-muted-foreground">
                  Muhokamalar
                </span>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-muted/50">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <Tag className="h-8 w-8 text-primary mb-2" />
                <span className="text-2xl font-bold">500+</span>
                <span className="text-sm text-muted-foreground">Mavzular</span>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-muted/50">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <Calendar className="h-8 w-8 text-primary mb-2" />
                <span className="text-2xl font-bold">30+</span>
                <span className="text-sm text-muted-foreground">Tadbir/Oy</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Qidiruv va Filtrlash */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Muhokamalar, mavzular yoki a'zolarni qidirish..."
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Tag className="mr-2 h-4 w-4" />
              Mavzular
            </Button>
            <Button variant="outline">
              <Users className="mr-2 h-4 w-4" />
              A'zolar
            </Button>
            <Button variant="outline">
              <TrendingUp className="mr-2 h-4 w-4" />
              Trendlar
            </Button>
          </div>
        </div>

        {/* Asosiy Kontent */}
        <Tabs defaultValue="discussions" className="space-y-6">
          <TabsList className="grid grid-cols-3 md:grid-cols-5 h-auto">
            <TabsTrigger value="discussions" className="py-2">
              Muhokamalar
            </TabsTrigger>
            <TabsTrigger value="members" className="py-2">
              A'zolar
            </TabsTrigger>
            <TabsTrigger value="groups" className="py-2">
              Guruhlar
            </TabsTrigger>
            <TabsTrigger value="events" className="py-2">
              Tadbirlar
            </TabsTrigger>
            <TabsTrigger value="leaderboard" className="py-2">
              Reyting
            </TabsTrigger>
          </TabsList>

          {/* Muhokamalar Tab */}
          <TabsContent value="discussions" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">So'nggi Muhokamalar</h2>
              <Button variant="outline" asChild>
                <Link to="/new-discussion">Muhokama Boshlash</Link>
              </Button>
            </div>

            <div className="space-y-4">
              {[
                {
                  title:
                    "React dasturlarini tezlashtirish bo'yicha eng yaxshi amaliyotlar",
                  author: "Jane Smith",
                  avatar: "JS",
                  replies: 24,
                  likes: 47,
                  time: "2 soat oldin",
                  tags: ["React", "Performance", "JavaScript"],
                },
                {
                  title: "Katta Next.js loyihalarini qanday tuzish kerak?",
                  author: "Mark Davis",
                  avatar: "MD",
                  replies: 18,
                  likes: 32,
                  time: "5 soat oldin",
                  tags: ["Next.js", "Arxitektura", "TypeScript"],
                },
                {
                  title: "Node.js dasturlaridagi xotira oqimlarini tuzatish",
                  author: "Aisha Lee",
                  avatar: "AL",
                  replies: 15,
                  likes: 29,
                  time: "Kecha",
                  tags: ["Node.js", "Debugging", "Performance"],
                },
                {
                  title:
                    "2023 yilda holatni boshqarish yechimlarini solishtirish",
                  author: "Raj Kumar",
                  avatar: "RK",
                  replies: 42,
                  likes: 76,
                  time: "2 kun oldin",
                  tags: ["React", "State Management", "Redux", "Zustand"],
                },
              ].map((discussion, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>{discussion.avatar}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-2">
                        <div>
                          <Link
                            to={`/discussions/${discussion.title
                              .toLowerCase()
                              .replace(/\s+/g, "-")}`}
                            className="text-lg font-medium hover:underline"
                          >
                            {discussion.title}
                          </Link>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>{discussion.author}</span>
                            <span>•</span>
                            <span>{discussion.time}</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {discussion.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center gap-4 pt-2">
                          <div className="flex items-center text-sm text-muted-foreground">
                            <MessageCircle className="mr-1 h-4 w-4" />
                            <span>{discussion.replies} javob</span>
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <ThumbsUp className="mr-1 h-4 w-4" />
                            <span>{discussion.likes} like</span>
                          </div>
                          <Button variant="ghost" size="sm" className="ml-auto">
                            <Bookmark className="h-4 w-4" />
                            <span className="sr-only">Saqlash</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex justify-center">
              <Button variant="outline">Ko'proq Muhokamalar</Button>
            </div>
          </TabsContent>

          {/* A'zolar Tab */}
          <TabsContent value="members" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Hamjamiyat A'zolari</h2>
              <Button variant="outline">A'zolarni Filtrlash</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  name: "Jane Smith",
                  username: "@janesmith",
                  avatar: "JS",
                  role: "Full Stack Dasturchi",
                  contributions: 156,
                  joined: "1 yil oldin",
                  badges: ["Top Contributor", "Mentor"],
                },
                {
                  name: "Mark Davis",
                  username: "@markdavis",
                  avatar: "MD",
                  role: "Frontend Muhandis",
                  contributions: 132,
                  joined: "2 yil oldin",
                  badges: ["Maqola Muallifi"],
                },
                {
                  name: "Aisha Lee",
                  username: "@aishalee",
                  avatar: "AL",
                  role: "DevOps Mutaxassisi",
                  contributions: 98,
                  joined: "8 oy oldin",
                  badges: ["Yulduzcha"],
                },
                {
                  name: "Raj Kumar",
                  username: "@rajkumar",
                  avatar: "RK",
                  role: "Backend Dasturchi",
                  contributions: 87,
                  joined: "1.5 yil oldin",
                  badges: ["Muammo Yechuvchi"],
                },
                {
                  name: "Sofia Garcia",
                  username: "@sofiagarcia",
                  avatar: "SG",
                  role: "Mobil Dasturchi",
                  contributions: 76,
                  joined: "10 oy oldin",
                  badges: ["Mobile Mutaxassisi"],
                },
                {
                  name: "James Wilson",
                  username: "@jameswilson",
                  avatar: "JW",
                  role: "UI/UX Dizayner",
                  contributions: 64,
                  joined: "6 oy oldin",
                  badges: ["Dizayn Ustasi"],
                },
              ].map((member, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback>{member.avatar}</AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <h3 className="font-medium">{member.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {member.username}
                        </p>
                        <p className="text-sm">{member.role}</p>
                        <div className="flex flex-wrap gap-2 pt-2">
                          {member.badges.map((badge) => (
                            <Badge
                              key={badge}
                              variant="outline"
                              className="text-xs"
                            >
                              {badge}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center gap-4 pt-3 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <Award className="mr-1 h-4 w-4" />
                            <span>{member.contributions}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="mr-1 h-4 w-4" />
                            <span>{member.joined}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="px-6 py-3 border-t bg-muted/30">
                    <Button variant="ghost" size="sm" className="text-xs">
                      Profilni Ko'rish
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs ml-auto"
                    >
                      Follow
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <div className="flex justify-center">
              <Button variant="outline">Barcha A'zolar</Button>
            </div>
          </TabsContent>

          {/* Guruhlar Tab */}
          <TabsContent value="groups" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Hamjamiyat Guruhlari</h2>
              <Button variant="outline" asChild>
                <Link to="/new-group">Guruh Yaratish</Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  name: "React Dasturchilari",
                  description:
                    "React, React Native va React ekotizimi haqida muhokamalar.",
                  members: 3240,
                  posts: 8765,
                  tags: ["React", "JavaScript", "Web Dasturlash"],
                },
                {
                  name: "DevOps Amaliyotchilari",
                  description:
                    "DevOps, CI/CD va bulut infratuzilmasi bo'yicha tajriba va eng yaxshi amaliyotlar.",
                  members: 2180,
                  posts: 5432,
                  tags: ["DevOps", "Cloud", "CI/CD"],
                },
                {
                  name: "Ma'lumotlar Fanlari & ML",
                  description:
                    "Ma'lumotlar fanlari, mashina o'rganishi va AI mavzulari bo'yicha muhokamalar.",
                  members: 1950,
                  posts: 4321,
                  tags: ["Data Science", "Machine Learning", "AI"],
                },
                {
                  name: "Backend Dasturchilar",
                  description:
                    "Server texnologiyalari, ma'lumotlar bazalari va API lar haqida muhokamalar.",
                  members: 2760,
                  posts: 6543,
                  tags: ["Backend", "API", "Ma'lumotlar Bazalari"],
                },
                {
                  name: "UI/UX Dizayn",
                  description:
                    "Dizayn maslahatlari, fikrlar va UX bo'yicha eng yaxshi amaliyotlar.",
                  members: 1540,
                  posts: 3210,
                  tags: ["Dizayn", "UI", "UX"],
                },
                {
                  name: "Kasbiy Rivojlanish",
                  description:
                    "Texnologiya sohasidagi karyerangizni rivojlantirish bo'yicha maslahatlar.",
                  members: 3120,
                  posts: 7654,
                  tags: ["Karyera", "Ishlar", "Intervyular"],
                },
              ].map((group, index) => (
                <Card key={index}>
                  <CardHeader className="pb-3">
                    <CardTitle>{group.name}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {group.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {group.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Users className="mr-1 h-4 w-4" />
                        <span>{group.members.toLocaleString()} a'zo</span>
                      </div>
                      <div className="flex items-center">
                        <MessageSquare className="mr-1 h-4 w-4" />
                        <span>{group.posts.toLocaleString()} post</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-4">
                    <Button variant="outline" size="sm" className="w-full">
                      Guruhga Qo'shilish
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <div className="flex justify-center">
              <Button variant="outline">Barcha Guruhlar</Button>
            </div>
          </TabsContent>

          {/* Tadbirlar Tab */}
          <TabsContent value="events" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Rejadagi Tadbirlar</h2>
              <Button variant="outline" asChild>
                <Link to="/events/calendar">Kalendarni Ko'rish</Link>
              </Button>
            </div>

            <div className="space-y-4">
              {[
                {
                  title: "React Advanced Workshop",
                  description:
                    "React ning ilg'or namunalari, ishlash optimallashtirish va holat boshqaruvini chuqur o'rganish.",
                  date: "15 Iyun, 2023",
                  time: "10:00 - 14:00",
                  location: "Online",
                  attendees: 156,
                  tags: ["React", "Workshop", "Advanced"],
                },
                {
                  title: "Node.js bilan Masshtablanuvchi API lar qurish",
                  description:
                    "Node.js va Express yordamida masshtablanuvchi, qo'llab-quvvatlanadigan API larni loyihalash va qurishni o'rganing.",
                  date: "22 Iyun, 2023",
                  time: "13:00 - 15:00",
                  location: "Online",
                  attendees: 132,
                  tags: ["Node.js", "API", "Backend"],
                },
                {
                  title: "DevOps Avtomatlashtirish Masterklassi",
                  description:
                    "CI/CD quvurlari va infratuzilmani kod sifatida yozish orqali ishlash jarayonini avtomatlashtiring.",
                  date: "5 Iyul, 2023",
                  time: "11:00 - 13:00",
                  location: "San Francisco, CA",
                  attendees: 98,
                  tags: ["DevOps", "Avtomatlashtirish", "CI/CD"],
                },
                {
                  title: "Veb Dostoplik Asoslari",
                  description:
                    "Veb ilovalaringizni hamma uchun qulay qilish uchun zarur bo'lgan usullarni o'rganing.",
                  date: "12 Iyul, 2023",
                  time: "14:00 - 16:00",
                  location: "Online",
                  attendees: 87,
                  tags: ["Dostoplik", "Veb", "Inklyuziv Dizayn"],
                },
              ].map((event, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="md:w-1/4 flex flex-col items-center justify-center p-4 bg-muted rounded-lg">
                        <div className="text-2xl font-bold text-primary">
                          {event.date.split(",")[0].split(" ")[1]}
                        </div>
                        <div className="text-sm">
                          {event.date.split(",")[0].split(" ")[0]}
                        </div>
                        <div className="mt-2 text-sm text-muted-foreground">
                          {event.time}
                        </div>
                      </div>
                      <div className="md:w-3/4 space-y-3">
                        <h3 className="text-xl font-medium">{event.title}</h3>
                        <p className="text-muted-foreground">
                          {event.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {event.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex flex-wrap items-center gap-4 pt-2 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <Calendar className="mr-1 h-4 w-4" />
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="mr-1 h-4 w-4" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="mr-1 h-4 w-4" />
                            <span>{event.location}</span>
                          </div>
                          <div className="flex items-center">
                            <Users className="mr-1 h-4 w-4" />
                            <span>{event.attendees} ishtirokchi</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="px-6 py-3 border-t flex justify-between">
                    <Button variant="outline" size="sm">
                      Batafsil
                    </Button>
                    <Button size="sm">Ro'yxatdan O'tish</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <div className="flex justify-center">
              <Button variant="outline">Barcha Tadbirlar</Button>
            </div>
          </TabsContent>

          {/* Reyting Tab */}
          <TabsContent value="leaderboard" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Hamjamiyat Reytingi</h2>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  Vaqt oraligi:
                </span>
                <Button variant="outline" size="sm">
                  Bu Oy
                </Button>
              </div>
            </div>

            <Card>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Eng Yaxshi 3 Hissa Qo'shuvchi */}
                    <Card className="bg-yellow-50 dark:bg-yellow-950/30 border-yellow-200 dark:border-yellow-800">
                      <CardContent className="p-6 flex flex-col items-center text-center">
                        <div className="relative mb-4">
                          <Avatar className="h-20 w-20 border-4 border-yellow-500">
                            <AvatarFallback className="text-xl">
                              JS
                            </AvatarFallback>
                          </Avatar>
                          <div className="absolute -bottom-2 -right-2 bg-yellow-500 text-white rounded-full h-8 w-8 flex items-center justify-center text-xs font-bold">
                            1
                          </div>
                        </div>
                        <h3 className="text-lg font-bold">Jane Smith</h3>
                        <p className="text-sm text-muted-foreground">
                          @janesmith
                        </p>
                        <div className="mt-4 space-y-2 w-full">
                          <div className="flex justify-between text-sm">
                            <span>Maqolalar</span>
                            <span className="font-medium">24</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Izohlar</span>
                            <span className="font-medium">156</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Olingan Like</span>
                            <span className="font-medium">892</span>
                          </div>
                        </div>
                        <Badge className="mt-4 bg-yellow-500 hover:bg-yellow-600">
                          Top Hissa Qo'shuvchi
                        </Badge>
                      </CardContent>
                    </Card>

                    <Card className="bg-gray-50 dark:bg-gray-900/30 border-gray-200 dark:border-gray-800">
                      <CardContent className="p-6 flex flex-col items-center text-center">
                        <div className="relative mb-4">
                          <Avatar className="h-20 w-20 border-4 border-gray-400">
                            <AvatarFallback className="text-xl">
                              MD
                            </AvatarFallback>
                          </Avatar>
                          <div className="absolute -bottom-2 -right-2 bg-gray-500 text-white rounded-full h-8 w-8 flex items-center justify-center text-xs font-bold">
                            2
                          </div>
                        </div>
                        <h3 className="text-lg font-bold">Mark Davis</h3>
                        <p className="text-sm text-muted-foreground">
                          @markdavis
                        </p>
                        <div className="mt-4 space-y-2 w-full">
                          <div className="flex justify-between text-sm">
                            <span>Maqolalar</span>
                            <span className="font-medium">18</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Izohlar</span>
                            <span className="font-medium">132</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Olingan Like</span>
                            <span className="font-medium">743</span>
                          </div>
                        </div>
                        <Badge className="mt-4 bg-gray-500 hover:bg-gray-600">
                          Kumush Hissa Qo'shuvchi
                        </Badge>
                      </CardContent>
                    </Card>

                    <Card className="bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800">
                      <CardContent className="p-6 flex flex-col items-center text-center">
                        <div className="relative mb-4">
                          <Avatar className="h-20 w-20 border-4 border-amber-700">
                            <AvatarFallback className="text-xl">
                              AL
                            </AvatarFallback>
                          </Avatar>
                          <div className="absolute -bottom-2 -right-2 bg-amber-700 text-white rounded-full h-8 w-8 flex items-center justify-center text-xs font-bold">
                            3
                          </div>
                        </div>
                        <h3 className="text-lg font-bold">Aisha Lee</h3>
                        <p className="text-sm text-muted-foreground">
                          @aishalee
                        </p>
                        <div className="mt-4 space-y-2 w-full">
                          <div className="flex justify-between text-sm">
                            <span>Maqolalar</span>
                            <span className="font-medium">15</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Izohlar</span>
                            <span className="font-medium">98</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Olingan Like</span>
                            <span className="font-medium">621</span>
                          </div>
                        </div>
                        <Badge className="mt-4 bg-amber-700 hover:bg-amber-800">
                          Bronza Hissa Qo'shuvchi
                        </Badge>
                      </CardContent>
                    </Card>
                  </div>

                  <Separator />

                  {/* Boshqa Top Hissa Qo'shuvchilar */}
                  <div className="space-y-4">
                    <h3 className="font-medium">
                      Boshqa Top Hissa Qo'shuvchilar
                    </h3>
                    <div className="space-y-2">
                      {[
                        {
                          name: "Raj Kumar",
                          username: "@rajkumar",
                          avatar: "RK",
                          rank: 4,
                          points: 587,
                        },
                        {
                          name: "Sofia Garcia",
                          username: "@sofiagarcia",
                          avatar: "SG",
                          rank: 5,
                          points: 542,
                        },
                        {
                          name: "James Wilson",
                          username: "@jameswilson",
                          avatar: "JW",
                          rank: 6,
                          points: 498,
                        },
                        {
                          name: "Elena Rodriguez",
                          username: "@elenarodriguez",
                          avatar: "ER",
                          rank: 7,
                          points: 456,
                        },
                        {
                          name: "David Kim",
                          username: "@davidkim",
                          avatar: "DK",
                          rank: 8,
                          points: 423,
                        },
                        {
                          name: "Priya Patel",
                          username: "@priyapatel",
                          avatar: "PP",
                          rank: 9,
                          points: 401,
                        },
                        {
                          name: "Thomas Chen",
                          username: "@thomaschen",
                          avatar: "TC",
                          rank: 10,
                          points: 387,
                        },
                      ].map((contributor, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 rounded-lg border"
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center h-7 w-7 rounded-full bg-muted text-xs font-medium">
                              {contributor.rank}
                            </div>
                            <Avatar className="h-10 w-10">
                              <AvatarFallback>
                                {contributor.avatar}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h4 className="font-medium">
                                {contributor.name}
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                {contributor.username}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-sm font-medium">
                              {contributor.points} ball
                            </div>
                            <Button variant="ghost" size="sm">
                              <Heart className="h-4 w-4 mr-1" />
                              Follow
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button
                  disabled
                  variant="outline"
                  className="w-fit cursor-not-allowed"
                >
                  To'liq Reyting
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Hamjamiyat Qoidalari */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Globe className="mr-2 h-5 w-5" />
              Hamjamiyat Qoidalari
            </CardTitle>
            <CardDescription>
              Bizning hamjamiyatimiz hurmat, inklyuzivlik va konstruktiv
              muloqotga asoslangan.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <h3 className="font-medium">Hurmatli Bo'ling</h3>
                  <p className="text-sm text-muted-foreground">
                    Boshqalarga hurmat va mehribonlik bilan munosabatda bo'ling.
                    Ixtiloflar tabiiy, lekin har doim shaxsga emas, g'oyalarga
                    e'tibor qarating.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Mavzuda Qoling</h3>
                  <p className="text-sm text-muted-foreground">
                    Muhokamalarni tegishli mavzuda ushlab turing. Bu
                    suhbatlarning sifatini saqlashga yordam beradi.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Taqiqsiz Muhit</h3>
                  <p className="text-sm text-muted-foreground">
                    Ta'qib qilish, nafratli nutq va shaxsiy hujumlar har qanday
                    sharoitda qabul qilinmaydi.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Manbalarni Ko'rsating</h3>
                  <p className="text-sm text-muted-foreground">
                    Kontent yoki kod ulashayotganda manbalarni to'g'ri
                    ko'rsating va intellektual mulkni hurmat qiling.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              disabled
              variant="link"
              className="mx-auto cursor-not-allowed text-muted-foreground"
            >
              <Link to="/guidelines">To'liq Hamjamiyat Qoidalari</Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Chaqiruv */}
        <div className="bg-primary text-primary-foreground rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">
            Hamjamiyatga qo'shilishga tayormisiz?
          </h2>
          <p className="text-primary-foreground/90 max-w-2xl mx-auto mb-6">
            Connect with fellow developers, share your knowledge, and grow your
            skills in a supportive environment.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="secondary" size="lg">
              Sign Up Now
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="bg-transparent border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
