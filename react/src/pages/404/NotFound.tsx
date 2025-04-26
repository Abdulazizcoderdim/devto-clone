import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Search,
  Home,
  Hash,
  Bookmark,
  Code,
  FileText,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="container pt-20 flex flex-col items-center justify-center min-h-[80vh] px-4 py-8 mx-auto">
      <Card className="w-full max-w-3xl border-2 border-muted">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-bold">
            404 - Page Not Found
          </CardTitle>
          <CardDescription className="text-xl mt-2">
            The page you're looking for doesn't exist or has been moved.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Illustration */}
          <div className="flex justify-center py-6">
            <div className="relative w-64 h-64 bg-muted rounded-full flex items-center justify-center">
              <img src="/logo.png" className="w-full h-full" />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button asChild size="lg">
            <Link to="/">Back to Home</Link>
          </Button>
        </CardFooter>
      </Card>

      <div className="mt-8 text-center text-muted-foreground">
        <p>
          If you think this is a mistake, please{" "}
          <Link to="/contact" className="text-primary hover:underline">
            contact support
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
