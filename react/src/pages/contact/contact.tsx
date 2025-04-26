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
            <h1 className="text-3xl font-bold tracking-tight">Contact Us</h1>
            <p className="text-muted-foreground mt-2">
              Have a question, suggestion, or just want to say hello? We'd love
              to hear from you.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Connect with us</h2>
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
            <h2 className="text-xl font-semibold">Quick support</h2>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <MessageSquare className="h-5 w-5 mt-0.5 text-muted-foreground" />
                <div>
                  <h3 className="font-medium">Community support</h3>
                  <p className="text-sm text-muted-foreground">
                    Get help from our community of developers in our forums.
                  </p>
                  <Link
                    to="/community"
                    className="text-sm text-primary hover:underline"
                  >
                    Visit forums
                  </Link>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="h-5 w-5 mt-0.5 text-muted-foreground" />
                <div>
                  <h3 className="font-medium">Email support</h3>
                  <p className="text-sm text-muted-foreground">
                    For urgent matters, email us directly at
                    abdulazizkxon19@gmail.com
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">FAQ</h2>
            <div className="space-y-2">
              <div>
                <h3 className="font-medium">
                  How long does it take to get a response?
                </h3>
                <p className="text-sm text-muted-foreground">
                  We typically respond within 24-48 hours on business days.
                </p>
              </div>
              <div>
                <h3 className="font-medium">
                  Can I contribute to the platform?
                </h3>
                <p className="text-sm text-muted-foreground">
                  Yes! Check out our{" "}
                  <Link
                    to="/contribute"
                    className="text-primary hover:underline"
                  >
                    contribution guidelines
                  </Link>
                  .
                </p>
              </div>
            </div>
            {/* <Link to="/faq" className="text-sm text-primary hover:underline">
              View all FAQs
            </Link> */}
          </div>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Send us a message</CardTitle>
              <CardDescription>
                Fill out the form below and we'll get back to you as soon as
                possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form action="/api/contact" className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First name</Label>
                    <Input id="first-name" name="first-name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last name</Label>
                    <Input id="last-name" name="last-name" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Select name="subject">
                    <SelectTrigger>
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Inquiry</SelectItem>
                      <SelectItem value="support">Technical Support</SelectItem>
                      <SelectItem value="feedback">Feedback</SelectItem>
                      <SelectItem value="partnership">Partnership</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell us how we can help..."
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
                      Subscribe to our developer newsletter for tips, tutorials,
                      and updates.
                    </Label>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
