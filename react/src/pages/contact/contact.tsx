import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Github, Twitter, Linkedin, Mail, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

export default function ContactPage() {
  return (
    <div className="container max-w-5xl pb-10 pt-20 px-4 mx-auto">
      <div className="grid gap-10 md:grid-cols-2">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Biz bilan bog'laning
            </h1>
            <p className="text-muted-foreground mt-2">
              Savolingiz, taklifingiz yoki shunchaki salom aytishni istaysizmi?
              Sizdan xabar olishdan mamnun bo'lamiz.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Biz bilan aloqa</h2>
            <div className="flex flex-wrap gap-4">
              <Button variant="outline" size="icon" asChild>
                <Link
                  to="https://github.com/Abdulazizcoderdim"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </Link>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <Link
                  to="https://x.com/cdoerdim3112"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </Link>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <Link
                  to="https://linkedin.com/in/abdulaziz-rustamov-530560343"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <Link to="mailto:abdulazizkxon19@gamil.com">
                  <Mail className="h-5 w-5" />
                  <span className="sr-only">Email</span>
                </Link>
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Tezkor yordam</h2>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <MessageSquare className="h-5 w-5 mt-0.5 text-muted-foreground" />
                <div>
                  <h3 className="font-medium">Hamjamiyat yordami</h3>
                  <p className="text-sm text-muted-foreground">
                    Forumlarimizda dasturchilar hamjamiyatidan yordam oling.
                  </p>
                  <Link
                    to="/community"
                    className="text-sm text-primary hover:underline"
                  >
                    Forumga o'tish
                  </Link>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="h-5 w-5 mt-0.5 text-muted-foreground" />
                <div>
                  <h3 className="font-medium">Elektron pochta orqali yordam</h3>
                  <p className="text-sm text-muted-foreground">
                    Favqulodda masalalar uchun to'g'ridan-to'g'ri elektron
                    pochta orqali yozing: abdulazizkxon19@gmail.com
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">
              Ko'p so'raladigan savollar
            </h2>
            <div className="space-y-2">
              <div>
                <h3 className="font-medium">
                  Javob olish uchun qancha vaqt ketadi?
                </h3>
                <p className="text-sm text-muted-foreground">
                  Odatda, biz ish kunlarida 24-48 soat ichida javob beramiz.
                </p>
              </div>
              <div>
                <h3 className="font-medium">
                  Platformaga hissa qo'shishim mumkinmi?
                </h3>
                <p className="text-sm text-muted-foreground">
                  Albatta! Bizning{" "}
                  <Link
                    to="/contribute"
                    className="text-primary hover:underline"
                  >
                    hissa qo'shish yo'riqnomalarimiz
                  </Link>
                  ni ko'rib chiqing.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Bizga xabar yuboring</CardTitle>
              <CardDescription>
                Quyidagi shaklni to'ldiring va biz sizga imkon qadar tezroq
                javob beramiz.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form action="/api/contact" className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">Ism</Label>
                    <Input id="first-name" name="first-name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Familiya</Label>
                    <Input id="last-name" name="last-name" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Elektron pochta</Label>
                  <Input id="email" name="email" type="email" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Mavzu</Label>
                  <Select name="subject">
                    <SelectTrigger>
                      <SelectValue placeholder="Mavzuni tanlang" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">Umumiy so'rov</SelectItem>
                      <SelectItem value="support">Texnik yordam</SelectItem>
                      <SelectItem value="feedback">Fikr-mulohaza</SelectItem>
                      <SelectItem value="partnership">Hamkorlik</SelectItem>
                      <SelectItem value="other">Boshqa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Xabar</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Bizga qanday yordam bera olishimizni aytib bering..."
                    className="min-h-32"
                    required
                  />
                </div>
                <div className="flex items-start space-x-2">
                  <Checkbox id="newsletter" name="newsletter" />
                  <div className="grid gap-1.5 leading-none">
                    <Label
                      htmlFor="newsletter"
                      className="text-sm font-normal leading-snug text-muted-foreground"
                    >
                      Maslahatlar, darsliklar va yangiliklardan xabardor bo'lish
                      uchun dasturchilar yangiliklar byulleteniga obuna bo'ling.
                    </Label>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full">
                Xabarni yuborish
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
