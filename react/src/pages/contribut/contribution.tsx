import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  FileText,
  Code,
  MessageSquare,
  Heart,
  Award,
  CheckCircle2,
  AlertCircle,
  Github,
  BookOpen,
  Lightbulb,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function ContributePage() {
  return (
    <div className="container max-w-5xl pb-10 pt-16 px-4 mx-auto">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">
            DevCommunity-ga Hissa Qo'shing
          </h1>
          <p className="text-xl text-muted-foreground">
            Butun dunyo dasturchilari uchun yaxshiroq hamjamiyat qurishga yordam
            bering.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 py-4">
          <Badge variant="outline" className="px-3 py-1 text-sm">
            <FileText className="mr-1 h-3.5 w-3.5" />
            Kontent
          </Badge>
          <Badge variant="outline" className="px-3 py-1 text-sm">
            <Code className="mr-1 h-3.5 w-3.5" />
            Kod
          </Badge>
          <Badge variant="outline" className="px-3 py-1 text-sm">
            <MessageSquare className="mr-1 h-3.5 w-3.5" />
            Hamjamiyat
          </Badge>
          <Badge variant="outline" className="px-3 py-1 text-sm">
            <Heart className="mr-1 h-3.5 w-3.5" />
            Qo'llab-quvvatlash
          </Badge>
        </div>

        <Tabs defaultValue="content" className="space-y-6">
          <TabsList className="grid grid-cols-2 md:grid-cols-3 h-auto">
            <TabsTrigger value="content" className="py-2">
              Kontent Yaratish
            </TabsTrigger>
            <TabsTrigger value="code" className="py-2">
              Kod Hisqasi
            </TabsTrigger>
            <TabsTrigger value="community" className="py-2">
              Hamjamiyat Qurish
            </TabsTrigger>
            {/* <TabsTrigger value="rewards" className="py-2">
              Mukofotlar & Tan Olish
            </TabsTrigger> */}
          </TabsList>

          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="mr-2 h-5 w-5" />
                  Maqolalar Yozish
                </CardTitle>
                <CardDescription>
                  Bilim va tajribangizni hamjamiyat bilan ulashing - texnik
                  maqolalar yozing.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Maqola Yo'riqnomalari</h3>
                  <ul className="space-y-2 ml-6 list-disc">
                    <li>
                      Boshqa dasturchilarga yordam beradigan texnik kontentga
                      e'tibor bering
                    </li>
                    <li>
                      Kod misollari, diagrammalar va tushuntirishlarni kiritish
                    </li>
                    <li>Manbalarni to'g'ri ko'rsatish</li>
                    <li>
                      Aniq, qisqa til va to'g'ri formatlashdan foydalanish
                    </li>
                    <li>Maqolalar kamida 500 so'zdan iborat bo'lishi kerak</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">
                    Kontent Kategoriyalari
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    <Badge className="justify-center">JavaScript</Badge>
                    <Badge className="justify-center">Python</Badge>
                    <Badge className="justify-center">React</Badge>
                    <Badge className="justify-center">DevOps</Badge>
                    <Badge className="justify-center">Data Science</Badge>
                    <Badge className="justify-center">Karera</Badge>
                  </div>
                </div>

                <div className="flex items-center p-4 bg-muted rounded-lg">
                  <Lightbulb className="h-10 w-10 text-yellow-500 mr-4" />
                  <div>
                    <h4 className="font-medium">Professional Maslaha</h4>
                    <p className="text-sm text-muted-foreground">
                      Amaliy misollar va keng tarqalgan muammolarga yechimlar
                      bilan maqolalar eng ko'p qiziqish uyg'otadi.
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild>
                  <Link to="/new">Yozishni Boshlash</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Kontentni Tekshirish Jarayoni
                </CardTitle>
                <CardDescription>
                  Platformada maqolalar qanday tekshirilishi va nashr etilishini
                  tushunish.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex flex-col items-center text-center p-4 rounded-lg border">
                      <div className="bg-primary/10 p-3 rounded-full mb-3">
                        <FileText className="h-6 w-6 text-primary" />
                      </div>
                      <h4 className="font-medium">1. Qoralama Yuborish</h4>
                      <p className="text-sm text-muted-foreground">
                        Maqolangizni yozib, muharririmiz orqali yuboring.
                      </p>
                    </div>
                    <div className="flex flex-col items-center text-center p-4 rounded-lg border">
                      <div className="bg-primary/10 p-3 rounded-full mb-3">
                        <CheckCircle2 className="h-6 w-6 text-primary" />
                      </div>
                      <h4 className="font-medium">2. Tekshirish</h4>
                      <p className="text-sm text-muted-foreground">
                        Bizning jamoa sifat va yo'riqnomalarga muvofiqligini
                        tekshiradi.
                      </p>
                    </div>
                    <div className="flex flex-col items-center text-center p-4 rounded-lg border">
                      <div className="bg-primary/10 p-3 rounded-full mb-3">
                        <Award className="h-6 w-6 text-primary" />
                      </div>
                      <h4 className="font-medium">3. Nashr Qilish</h4>
                      <p className="text-sm text-muted-foreground">
                        Tasdiqlangan maqolalar nashr etiladi va hamjamiyatga
                        taqdim etiladi.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start p-4 bg-yellow-50 dark:bg-yellow-950/50 rounded-lg border border-yellow-200 dark:border-yellow-900">
                    <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-500 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-yellow-800 dark:text-yellow-400">
                        Tekshirish Vaqti
                      </h4>
                      <p className="text-sm text-yellow-700 dark:text-yellow-300">
                        Ko'pgina maqolalar 2-3 ish kunida tekshiriladi. Murakkab
                        yoki uzun maqolalar ko'proq vaqt olishi mumkin.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="code" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Code className="mr-2 h-5 w-5" />
                  Kod Bazasiga Hissa Qo'shish
                </CardTitle>
                <CardDescription>
                  Platformani yaxshilashga yordam bering - kod yozish, xatolarni
                  tuzatish yoki yangi funksiyalar qo'shish.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">
                    Qanday Hissa Qo'shish Mumkin
                  </h3>
                  <ol className="space-y-3 ml-6 list-decimal">
                    <li>
                      <span className="font-medium">
                        Repozitoriyani forklash
                      </span>
                      <p className="text-sm text-muted-foreground">
                        GitHub repozitoriyasini o'z hisobingizga fork qiling.
                      </p>
                    </li>
                    <li>
                      <span className="font-medium">
                        Ishlash muhitini sozlash
                      </span>
                      <p className="text-sm text-muted-foreground">
                        README faylidagi ko'rsatmalarga amal qiling.
                      </p>
                    </li>
                    <li>
                      <span className="font-medium">
                        Masala yoki funksiyani tanlash
                      </span>
                      <p className="text-sm text-muted-foreground">
                        Ochiq masalalardan tanlang yoki yangi funksiya taklif
                        qiling.
                      </p>
                    </li>
                    <li>
                      <span className="font-medium">Branch yaratish</span>
                      <p className="text-sm text-muted-foreground">
                        O'zgarishlaringiz uchun alohida branch yarating.
                      </p>
                    </li>
                    <li>
                      <span className="font-medium">Pull request yuborish</span>
                      <p className="text-sm text-muted-foreground">
                        O'zgarishlaringizni aniq tasvirlab PR oching.
                      </p>
                    </li>
                  </ol>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Texnik Stack</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    <Badge variant="outline" className="justify-center">
                      Next.js
                    </Badge>
                    <Badge variant="outline" className="justify-center">
                      TypeScript
                    </Badge>
                    <Badge variant="outline" className="justify-center">
                      Tailwind CSS
                    </Badge>
                    <Badge variant="outline" className="justify-center">
                      PostgreSQL
                    </Badge>
                    <Badge variant="outline" className="justify-center">
                      Prisma
                    </Badge>
                    <Badge variant="outline" className="justify-center">
                      tRPC
                    </Badge>
                    <Badge variant="outline" className="justify-center">
                      Jest
                    </Badge>
                    <Badge variant="outline" className="justify-center">
                      Cypress
                    </Badge>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-wrap gap-4">
                <Button variant="outline" asChild>
                  <Link
                    to="https://github.com/Abdulazizcoderdim"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="mr-2 h-4 w-4" />
                    Repozitoriyani Ko'rish
                  </Link>
                </Button>
                {/* <Button asChild>
                  <Link to="/docs/contributing">
                    <Code className="mr-2 h-4 w-4" />
                    Dasturchilar Qo'llanmasi
                  </Link>
                </Button> */}
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="community" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="mr-2 h-5 w-5" />
                  Hamjamiyat Ishtiroki
                </CardTitle>
                <CardDescription>
                  Qo'llab-quvvatlovchi va qamrab oluvchi dasturchilar
                  hamjamiyatini rivojlantirishga yordam bering.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="p-4 rounded-lg border">
                    <h3 className="text-lg font-medium flex items-center">
                      <MessageSquare className="mr-2 h-5 w-5" />
                      Muhokama Moderatsiyasi
                    </h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      Muhokamalarni moderatsiya qilish, savollarga javob berish
                      va izoh bo'limlarida ijobiy muhitni saqlashga yordam
                      bering.
                    </p>
                    <Button
                      disabled
                      variant="link"
                      className="px-0 mt-2 text-muted-foreground/50 hover:no-underline hover:cursor-not-allowed"
                    >
                      <Link
                        aria-disabled="true"
                        to="/community/moderator-application"
                      >
                        Moderator bo'lish uchun ariza
                      </Link>
                    </Button>
                  </div>

                  <div className="p-4 rounded-lg border">
                    <h3 className="text-lg font-medium flex items-center">
                      <Heart className="mr-2 h-5 w-5" />
                      Mentorlik Dasturi
                    </h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      Yangi dasturchilarga mentorlik qiling yoki tajribali
                      hamjamiyat a'zolaridan mentorlik oling.
                    </p>
                    <Button
                      disabled
                      className="px-0 mt-2 text-muted-foreground/50 hover:no-underline hover:cursor-not-allowed"
                      variant="link"
                    >
                      <Link aria-disabled="true" to="/mentorship">
                        Dasturga Qo'shilish
                      </Link>
                    </Button>
                  </div>

                  <div className="p-4 rounded-lg border">
                    <h3 className="text-lg font-medium flex items-center">
                      <Award className="mr-2 h-5 w-5" />
                      Tadbirlar & Vebinarlar
                    </h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      Hamjamiyat tadbirlari, vebinarlari va jonli kodlash
                      sessiyalarida qatnashing yoki o'zingiz tashkil qiling.
                    </p>
                    <Button
                      disabled
                      className="px-0 mt-2 text-muted-foreground/50 hover:no-underline hover:cursor-not-allowed"
                      variant="link"
                    >
                      <Link aria-disabled="true" to="/events">
                        Rejadagi Tadbirlar
                      </Link>
                    </Button>
                  </div>

                  <div className="p-4 rounded-lg border">
                    <h3 className="text-lg font-medium flex items-center">
                      <Lightbulb className="mr-2 h-5 w-5" />
                      Fikr-mulohazalar & G'oyalar
                    </h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      Platforma va hamjamiyat tajribasini yaxshilash uchun
                      g'oyalaringiz va fikrlaringizni ulashing.
                    </p>
                    <Button
                      disabled
                      className="px-0 mt-2 text-muted-foreground/50 hover:no-underline hover:cursor-not-allowed"
                      variant="link"
                    >
                      <Link aria-disabled="true" to="/feedback">
                        Fikr Yuborish
                      </Link>
                    </Button>
                  </div>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="text-lg font-medium">Hamjamiyat Qoidalari</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    Bizning hamjamiyatimiz hurmat, inklyuzivlik va konstruktiv
                    muloqotga asoslangan. Barcha a'zolar quyidagilarga rioya
                    qilishlari kerak:
                  </p>
                  <ul className="space-y-1 mt-2 ml-6 list-disc text-sm text-muted-foreground">
                    <li>
                      Barcha hamjamiyat a'zolariga hurmatli va inklyuziv bo'lish
                    </li>
                    <li>
                      Konstruktiv fikr-mulohaza bildirish va keraksiz
                      tanqidlardan qochish
                    </li>
                    <li>
                      Boshqalarga yordam berish va bilim almashishga e'tibor
                      qaratish
                    </li>
                    <li>
                      Intellektual mulkni hurmat qilish va manbalarni to'g'ri
                      ko'rsatish
                    </li>
                    <li>
                      Noo'rin xatti-harakatlar yoki kontent haqida xabar berish
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rewards" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="mr-2 h-5 w-5" />
                  Hissa Qo'shuvchilarni Tan Olish
                </CardTitle>
                <CardDescription>
                  Hamjamiyatimizga qimmatli hissa qo'shganlarni qanday tan
                  olishimiz va mukofotlashimiz.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-6 md:grid-cols-3">
                  <div className="flex flex-col items-center text-center p-6 rounded-lg border">
                    <div className="bg-yellow-100 dark:bg-yellow-900/50 p-3 rounded-full mb-4">
                      <Award className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
                    </div>
                    <h3 className="text-lg font-medium">Belgilar & Yutuqlar</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      Turli hissalar va yutuqlar uchun profilingizda maxsus
                      belgilar oling.
                    </p>
                    <Button variant="link" asChild className="mt-auto">
                      <Link to="/badges">Belgilar Galereyasi</Link>
                    </Button>
                  </div>

                  <div className="flex flex-col items-center text-center p-6 rounded-lg border">
                    <div className="bg-green-100 dark:bg-green-900/50 p-3 rounded-full mb-4">
                      <Users className="h-8 w-8 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="text-lg font-medium">
                      Tanlangan Hissa Qo'shuvchilar
                    </h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      Eng yaxshi hissa qo'shuvchilar bosh sahifamizda va
                      yangiliklar byulletenida taqdim etiladi.
                    </p>
                    <Button variant="link" asChild className="mt-auto">
                      <Link to="/featured">Tanlanganlarni Ko'rish</Link>
                    </Button>
                  </div>

                  <div className="flex flex-col items-center text-center p-6 rounded-lg border">
                    <div className="bg-purple-100 dark:bg-purple-900/50 p-3 rounded-full mb-4">
                      <Heart className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h3 className="text-lg font-medium">
                      Hamjamiyat Mukofotlari
                    </h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      Sovg'alar, premium funksiyalar yoki xayriya uchun
                      aylantirish mumkin bo'lgan ballar to'plang.
                    </p>
                    <Button variant="link" asChild className="mt-auto">
                      <Link to="/rewards">Mukofotlarni Ko'rish</Link>
                    </Button>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-4">
                    Oyning Eng Yaxshi Hissa Qo'shuvchilari
                  </h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="flex items-center gap-4 p-4 rounded-lg border">
                      <div className="relative">
                        <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                          <span className="font-semibold">JS</span>
                        </div>
                        <div className="absolute -bottom-1 -right-1 bg-yellow-500 text-white rounded-full h-6 w-6 flex items-center justify-center text-xs">
                          1
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium">Jane Smith</h4>
                        <p className="text-sm text-muted-foreground">
                          12 maqola, 45 izoh
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 rounded-lg border">
                      <div className="relative">
                        <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                          <span className="font-semibold">MD</span>
                        </div>
                        <div className="absolute -bottom-1 -right-1 bg-gray-500 text-white rounded-full h-6 w-6 flex items-center justify-center text-xs">
                          2
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium">Mark Davis</h4>
                        <p className="text-sm text-muted-foreground">
                          8 maqola, 32 izoh
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 rounded-lg border">
                      <div className="relative">
                        <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                          <span className="font-semibold">AL</span>
                        </div>
                        <div className="absolute -bottom-1 -right-1 bg-amber-700 text-white rounded-full h-6 w-6 flex items-center justify-center text-xs">
                          3
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium">Aisha Lee</h4>
                        <p className="text-sm text-muted-foreground">
                          5 maqola, 28 izoh
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 rounded-lg border">
                      <div className="relative">
                        <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                          <span className="font-semibold">RK</span>
                        </div>
                        <div className="absolute -bottom-1 -right-1 bg-muted-foreground text-white rounded-full h-6 w-6 flex items-center justify-center text-xs">
                          4
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium">Raj Kumar</h4>
                        <p className="text-sm text-muted-foreground">
                          7 maqola, 19 izoh
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild>
                  <Link to="/leaderboard">To'liq Reytingni Ko'rish</Link>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="bg-muted p-6 rounded-lg">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="md:flex-1">
              <h2 className="text-2xl font-bold">
                Hissa qo'shishga tayyormisiz?
              </h2>
              <p className="text-muted-foreground mt-2">
                Dasturchilarning o'sib borayotgan hamjamiyatiga qo'shiling va
                bilimingizni bugundan ulasha boshlang.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg">
                <Link to="/new">Yozishni Boshlash</Link>
              </Button>
              <Button variant="outline" asChild size="lg">
                <Link
                  to="https://github.com/Abdulazizcoderdim"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
