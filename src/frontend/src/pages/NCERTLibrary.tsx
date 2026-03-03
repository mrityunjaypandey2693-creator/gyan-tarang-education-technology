import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BookOpen,
  CheckCircle,
  Download,
  ExternalLink,
  Play,
  Search,
  Video,
} from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

interface Book {
  subject: string;
  icon: string;
  color: string;
  chapters: number;
  pages: number;
  pdfUrl: string;
  onlineReadUrl: string;
  videoLectureId: string;
  videoSearchQuery: string;
}

const booksByClass: Record<string, Book[]> = {
  "Class 1": [
    {
      subject: "Mathematics - Magic",
      icon: "📐",
      color: "from-blue-500 to-blue-600",
      chapters: 13,
      pages: 120,
      pdfUrl: "https://ncert.nic.in/textbook.php?aemh1=0-13",
      onlineReadUrl: "https://ncert.nic.in/textbook.php?aemh1=0-13",
      videoLectureId: "",
      videoSearchQuery: "NCERT Class 1 Mathematics Magic video lecture",
    },
    {
      subject: "English - Marigold",
      icon: "📚",
      color: "from-purple-500 to-purple-600",
      chapters: 10,
      pages: 100,
      pdfUrl: "https://ncert.nic.in/textbook.php?aerh1=0-10",
      onlineReadUrl: "https://ncert.nic.in/textbook.php?aerh1=0-10",
      videoLectureId: "",
      videoSearchQuery: "NCERT Class 1 English Marigold video lecture",
    },
    {
      subject: "Hindi - Rimjhim",
      icon: "🔤",
      color: "from-orange-500 to-orange-600",
      chapters: 23,
      pages: 130,
      pdfUrl: "https://ncert.nic.in/textbook.php?ahrh1=0-23",
      onlineReadUrl: "https://ncert.nic.in/textbook.php?ahrh1=0-23",
      videoLectureId: "",
      videoSearchQuery: "NCERT Class 1 Hindi Rimjhim video lecture",
    },
  ],
  "Class 2": [
    {
      subject: "Mathematics - Magic",
      icon: "📐",
      color: "from-blue-500 to-blue-600",
      chapters: 15,
      pages: 140,
      pdfUrl: "https://ncert.nic.in/textbook.php?bemh1=0-15",
      onlineReadUrl: "https://ncert.nic.in/textbook.php?bemh1=0-15",
      videoLectureId: "",
      videoSearchQuery: "NCERT Class 2 Mathematics video lecture Hindi",
    },
    {
      subject: "English - Marigold",
      icon: "📚",
      color: "from-purple-500 to-purple-600",
      chapters: 10,
      pages: 110,
      pdfUrl: "https://ncert.nic.in/textbook.php?berh1=0-10",
      onlineReadUrl: "https://ncert.nic.in/textbook.php?berh1=0-10",
      videoLectureId: "",
      videoSearchQuery: "NCERT Class 2 English Marigold video lecture",
    },
    {
      subject: "Hindi - Rimjhim",
      icon: "🔤",
      color: "from-orange-500 to-orange-600",
      chapters: 15,
      pages: 120,
      pdfUrl: "https://ncert.nic.in/textbook.php?bhrh1=0-15",
      onlineReadUrl: "https://ncert.nic.in/textbook.php?bhrh1=0-15",
      videoLectureId: "",
      videoSearchQuery: "NCERT Class 2 Hindi Rimjhim video lecture",
    },
  ],
  "Class 3": [
    {
      subject: "Mathematics",
      icon: "📐",
      color: "from-blue-500 to-blue-600",
      chapters: 14,
      pages: 160,
      pdfUrl: "https://ncert.nic.in/textbook.php?cemh1=0-14",
      onlineReadUrl: "https://ncert.nic.in/textbook.php?cemh1=0-14",
      videoLectureId: "",
      videoSearchQuery: "NCERT Class 3 Mathematics video lecture Hindi",
    },
    {
      subject: "English - Marigold",
      icon: "📚",
      color: "from-purple-500 to-purple-600",
      chapters: 10,
      pages: 120,
      pdfUrl: "https://ncert.nic.in/textbook.php?cerh1=0-10",
      onlineReadUrl: "https://ncert.nic.in/textbook.php?cerh1=0-10",
      videoLectureId: "",
      videoSearchQuery: "NCERT Class 3 English Marigold video lecture",
    },
    {
      subject: "Hindi - Rimjhim",
      icon: "🔤",
      color: "from-orange-500 to-orange-600",
      chapters: 15,
      pages: 130,
      pdfUrl: "https://ncert.nic.in/textbook.php?chrh1=0-15",
      onlineReadUrl: "https://ncert.nic.in/textbook.php?chrh1=0-15",
      videoLectureId: "",
      videoSearchQuery: "NCERT Class 3 Hindi Rimjhim video lecture",
    },
    {
      subject: "EVS - Looking Around",
      icon: "🌿",
      color: "from-green-500 to-green-600",
      chapters: 24,
      pages: 180,
      pdfUrl: "https://ncert.nic.in/textbook.php?cevs1=0-24",
      onlineReadUrl: "https://ncert.nic.in/textbook.php?cevs1=0-24",
      videoLectureId: "",
      videoSearchQuery: "NCERT Class 3 EVS Looking Around video lecture Hindi",
    },
  ],
  "Class 4": [
    {
      subject: "Mathematics",
      icon: "📐",
      color: "from-blue-500 to-blue-600",
      chapters: 14,
      pages: 170,
      pdfUrl: "https://ncert.nic.in/textbook.php?demh1=0-14",
      onlineReadUrl: "https://ncert.nic.in/textbook.php?demh1=0-14",
      videoLectureId: "",
      videoSearchQuery: "NCERT Class 4 Mathematics video lecture Hindi",
    },
    {
      subject: "English - Marigold",
      icon: "📚",
      color: "from-purple-500 to-purple-600",
      chapters: 10,
      pages: 130,
      pdfUrl: "https://ncert.nic.in/textbook.php?derh1=0-10",
      onlineReadUrl: "https://ncert.nic.in/textbook.php?derh1=0-10",
      videoLectureId: "",
      videoSearchQuery: "NCERT Class 4 English Marigold video lecture",
    },
    {
      subject: "Hindi - Rimjhim",
      icon: "🔤",
      color: "from-orange-500 to-orange-600",
      chapters: 18,
      pages: 140,
      pdfUrl: "https://ncert.nic.in/textbook.php?dhrh1=0-18",
      onlineReadUrl: "https://ncert.nic.in/textbook.php?dhrh1=0-18",
      videoLectureId: "",
      videoSearchQuery: "NCERT Class 4 Hindi Rimjhim video lecture",
    },
    {
      subject: "EVS - Looking Around",
      icon: "🌿",
      color: "from-green-500 to-green-600",
      chapters: 27,
      pages: 200,
      pdfUrl: "https://ncert.nic.in/textbook.php?devs1=0-27",
      onlineReadUrl: "https://ncert.nic.in/textbook.php?devs1=0-27",
      videoLectureId: "",
      videoSearchQuery: "NCERT Class 4 EVS Looking Around video lecture Hindi",
    },
  ],
  "Class 5": [
    {
      subject: "Mathematics",
      icon: "📐",
      color: "from-blue-500 to-blue-600",
      chapters: 14,
      pages: 180,
      pdfUrl: "https://ncert.nic.in/textbook.php?eemh1=0-14",
      onlineReadUrl: "https://ncert.nic.in/textbook.php?eemh1=0-14",
      videoLectureId: "",
      videoSearchQuery: "NCERT Class 5 Mathematics video lecture Hindi",
    },
    {
      subject: "English - Marigold",
      icon: "📚",
      color: "from-purple-500 to-purple-600",
      chapters: 10,
      pages: 140,
      pdfUrl: "https://ncert.nic.in/textbook.php?eerh1=0-10",
      onlineReadUrl: "https://ncert.nic.in/textbook.php?eerh1=0-10",
      videoLectureId: "",
      videoSearchQuery: "NCERT Class 5 English Marigold video lecture",
    },
    {
      subject: "Hindi - Rimjhim",
      icon: "🔤",
      color: "from-orange-500 to-orange-600",
      chapters: 18,
      pages: 150,
      pdfUrl: "https://ncert.nic.in/textbook.php?ehrh1=0-18",
      onlineReadUrl: "https://ncert.nic.in/textbook.php?ehrh1=0-18",
      videoLectureId: "",
      videoSearchQuery: "NCERT Class 5 Hindi Rimjhim video lecture",
    },
    {
      subject: "EVS - Looking Around",
      icon: "🌿",
      color: "from-green-500 to-green-600",
      chapters: 22,
      pages: 190,
      pdfUrl: "https://ncert.nic.in/textbook.php?eevs1=0-22",
      onlineReadUrl: "https://ncert.nic.in/textbook.php?eevs1=0-22",
      videoLectureId: "",
      videoSearchQuery: "NCERT Class 5 EVS video lecture Hindi",
    },
  ],
  "Class 6": [
    {
      subject: "Mathematics",
      icon: "📐",
      color: "from-blue-500 to-blue-600",
      chapters: 14,
      pages: 290,
      pdfUrl: "https://ncert.nic.in/textbook.php?femh1=0-14",
      onlineReadUrl: "https://ncert.nic.in/textbook.php?femh1=0-14",
      videoLectureId: "GiSpFKBpZ3c",
      videoSearchQuery: "NCERT Class 6 Mathematics video lecture Hindi",
    },
    {
      subject: "Science",
      icon: "🔬",
      color: "from-green-500 to-green-600",
      chapters: 16,
      pages: 260,
      pdfUrl: "https://ncert.nic.in/textbook.php?fesc1=0-16",
      onlineReadUrl: "https://ncert.nic.in/textbook.php?fesc1=0-16",
      videoLectureId: "0CvIBmmxQJk",
      videoSearchQuery: "NCERT Class 6 Science video lecture Hindi",
    },
    {
      subject: "Social Science - History",
      icon: "🏛️",
      color: "from-orange-500 to-orange-600",
      chapters: 11,
      pages: 180,
      pdfUrl: "https://ncert.nic.in/textbook.php?fess1=0-11",
      onlineReadUrl: "https://ncert.nic.in/textbook.php?fess1=0-11",
      videoLectureId: "",
      videoSearchQuery:
        "NCERT Class 6 History Social Science video lecture Hindi",
    },
    {
      subject: "Social Science - Geography",
      icon: "🌍",
      color: "from-teal-500 to-teal-600",
      chapters: 8,
      pages: 140,
      pdfUrl: "https://ncert.nic.in/textbook.php?fesg1=0-8",
      onlineReadUrl: "https://ncert.nic.in/textbook.php?fesg1=0-8",
      videoLectureId: "",
      videoSearchQuery:
        "NCERT Class 6 Geography Social Science video lecture Hindi",
    },
    {
      subject: "English - Honeysuckle",
      icon: "📚",
      color: "from-purple-500 to-purple-600",
      chapters: 10,
      pages: 160,
      pdfUrl: "https://ncert.nic.in/textbook.php?ferh1=0-10",
      onlineReadUrl: "https://ncert.nic.in/textbook.php?ferh1=0-10",
      videoLectureId: "",
      videoSearchQuery: "NCERT Class 6 English Honeysuckle video lecture",
    },
    {
      subject: "Hindi - Vasant",
      icon: "🔤",
      color: "from-red-500 to-red-600",
      chapters: 17,
      pages: 200,
      pdfUrl: "https://ncert.nic.in/textbook.php?fhvs1=0-17",
      onlineReadUrl: "https://ncert.nic.in/textbook.php?fhvs1=0-17",
      videoLectureId: "",
      videoSearchQuery: "NCERT Class 6 Hindi Vasant video lecture",
    },
  ],
  "Class 7": [
    {
      subject: "Mathematics",
      icon: "📐",
      color: "from-blue-500 to-blue-600",
      chapters: 15,
      pages: 310,
      pdfUrl: "https://ncert.nic.in/textbook.php?gemh1=0-15",
      onlineReadUrl: "https://ncert.nic.in/textbook.php?gemh1=0-15",
      videoLectureId: "GiSpFKBpZ3c",
      videoSearchQuery: "NCERT Class 7 Mathematics video lecture Hindi",
    },
    {
      subject: "Science",
      icon: "🔬",
      color: "from-green-500 to-green-600",
      chapters: 18,
      pages: 280,
      pdfUrl: "https://ncert.nic.in/textbook.php?gesc1=0-18",
      onlineReadUrl: "https://ncert.nic.in/textbook.php?gesc1=0-18",
      videoLectureId: "0CvIBmmxQJk",
      videoSearchQuery: "NCERT Class 7 Science video lecture Hindi",
    },
    {
      subject: "Social Science - History",
      icon: "🏛️",
      color: "from-orange-500 to-orange-600",
      chapters: 10,
      pages: 190,
      pdfUrl: "https://ncert.nic.in/textbook.php?gess1=0-10",
      onlineReadUrl: "https://ncert.nic.in/textbook.php?gess1=0-10",
      videoLectureId: "",
      videoSearchQuery:
        "NCERT Class 7 History Social Science video lecture Hindi",
    },
    {
      subject: "Social Science - Geography",
      icon: "🌍",
      color: "from-teal-500 to-teal-600",
      chapters: 9,
      pages: 150,
      pdfUrl: "https://ncert.nic.in/textbook.php?gesg1=0-9",
      onlineReadUrl: "https://ncert.nic.in/textbook.php?gesg1=0-9",
      videoLectureId: "",
      videoSearchQuery: "NCERT Class 7 Geography video lecture Hindi",
    },
    {
      subject: "English - Honeycomb",
      icon: "📚",
      color: "from-purple-500 to-purple-600",
      chapters: 10,
      pages: 170,
      pdfUrl: "https://ncert.nic.in/textbook.php?gerh1=0-10",
      onlineReadUrl: "https://ncert.nic.in/textbook.php?gerh1=0-10",
      videoLectureId: "",
      videoSearchQuery: "NCERT Class 7 English Honeycomb video lecture",
    },
    {
      subject: "Hindi - Vasant",
      icon: "🔤",
      color: "from-red-500 to-red-600",
      chapters: 20,
      pages: 220,
      pdfUrl: "https://ncert.nic.in/textbook.php?ghvs1=0-20",
      onlineReadUrl: "https://ncert.nic.in/textbook.php?ghvs1=0-20",
      videoLectureId: "",
      videoSearchQuery: "NCERT Class 7 Hindi Vasant video lecture",
    },
  ],
  "Class 8": [
    {
      subject: "Mathematics",
      icon: "📐",
      color: "from-blue-500 to-blue-600",
      chapters: 16,
      pages: 320,
      pdfUrl: "https://ncert.nic.in/textbook.php?hemh1=0-16",
      onlineReadUrl: "https://ncert.nic.in/textbook.php?hemh1=0-16",
      videoLectureId: "GiSpFKBpZ3c",
      videoSearchQuery: "NCERT Class 8 Mathematics video lecture Hindi",
    },
    {
      subject: "Science",
      icon: "🔬",
      color: "from-green-500 to-green-600",
      chapters: 18,
      pages: 300,
      pdfUrl: "https://ncert.nic.in/textbook.php?hesc1=0-18",
      onlineReadUrl: "https://ncert.nic.in/textbook.php?hesc1=0-18",
      videoLectureId: "0CvIBmmxQJk",
      videoSearchQuery: "NCERT Class 8 Science video lecture Hindi",
    },
    {
      subject: "Social Science - History",
      icon: "🏛️",
      color: "from-orange-500 to-orange-600",
      chapters: 12,
      pages: 200,
      pdfUrl: "https://ncert.nic.in/textbook.php?hess1=0-12",
      onlineReadUrl: "https://ncert.nic.in/textbook.php?hess1=0-12",
      videoLectureId: "",
      videoSearchQuery: "NCERT Class 8 History video lecture Hindi",
    },
    {
      subject: "Social Science - Geography",
      icon: "🌍",
      color: "from-teal-500 to-teal-600",
      chapters: 6,
      pages: 120,
      pdfUrl: "https://ncert.nic.in/textbook.php?hesg1=0-6",
      onlineReadUrl: "https://ncert.nic.in/textbook.php?hesg1=0-6",
      videoLectureId: "",
      videoSearchQuery: "NCERT Class 8 Geography video lecture Hindi",
    },
    {
      subject: "English - Honeydew",
      icon: "📚",
      color: "from-purple-500 to-purple-600",
      chapters: 10,
      pages: 180,
      pdfUrl: "https://ncert.nic.in/textbook.php?herh1=0-10",
      onlineReadUrl: "https://ncert.nic.in/textbook.php?herh1=0-10",
      videoLectureId: "",
      videoSearchQuery: "NCERT Class 8 English Honeydew video lecture",
    },
    {
      subject: "Hindi - Vasant",
      icon: "🔤",
      color: "from-red-500 to-red-600",
      chapters: 18,
      pages: 230,
      pdfUrl: "https://ncert.nic.in/textbook.php?hhvs1=0-18",
      onlineReadUrl: "https://ncert.nic.in/textbook.php?hhvs1=0-18",
      videoLectureId: "",
      videoSearchQuery: "NCERT Class 8 Hindi Vasant video lecture",
    },
  ],
  "Class 9": [
    {
      subject: "Mathematics",
      icon: "📐",
      color: "from-blue-500 to-blue-600",
      chapters: 15,
      pages: 350,
      pdfUrl: "https://ncert.nic.in/textbook.php?iemh1=0-15",
      onlineReadUrl: "https://ncert.nic.in/textbook.php?iemh1=0-15",
      videoLectureId: "yjBjSymoKpY",
      videoSearchQuery: "NCERT Class 9 Mathematics video lecture Hindi",
    },
    {
      subject: "Science",
      icon: "🔬",
      color: "from-green-500 to-green-600",
      chapters: 15,
      pages: 320,
      pdfUrl: "https://ncert.nic.in/textbook.php?iesc1=0-15",
      onlineReadUrl: "https://ncert.nic.in/textbook.php?iesc1=0-15",
      videoLectureId: "hgjnrwWqE8k",
      videoSearchQuery: "NCERT Class 9 Science video lecture Hindi",
    },
    {
      subject: "Social Science - History",
      icon: "🏛️",
      color: "from-orange-500 to-orange-600",
      chapters: 5,
      pages: 160,
      pdfUrl: "https://ncert.nic.in/textbook.php?iess1=0-5",
      onlineReadUrl: "https://ncert.nic.in/textbook.php?iess1=0-5",
      videoLectureId: "",
      videoSearchQuery:
        "NCERT Class 9 History India and the Contemporary World video lecture Hindi",
    },
    {
      subject: "Social Science - Geography",
      icon: "🌍",
      color: "from-teal-500 to-teal-600",
      chapters: 6,
      pages: 140,
      pdfUrl: "https://ncert.nic.in/textbook.php?iesg1=0-6",
      onlineReadUrl: "https://ncert.nic.in/textbook.php?iesg1=0-6",
      videoLectureId: "",
      videoSearchQuery:
        "NCERT Class 9 Geography Contemporary India video lecture Hindi",
    },
    {
      subject: "English - Beehive",
      icon: "📚",
      color: "from-purple-500 to-purple-600",
      chapters: 11,
      pages: 190,
      pdfUrl: "https://ncert.nic.in/textbook.php?ierh1=0-11",
      onlineReadUrl: "https://ncert.nic.in/textbook.php?ierh1=0-11",
      videoLectureId: "",
      videoSearchQuery: "NCERT Class 9 English Beehive video lecture",
    },
    {
      subject: "Hindi - Kshitij",
      icon: "🔤",
      color: "from-red-500 to-red-600",
      chapters: 17,
      pages: 240,
      pdfUrl: "https://ncert.nic.in/textbook.php?ihkv1=0-17",
      onlineReadUrl: "https://ncert.nic.in/textbook.php?ihkv1=0-17",
      videoLectureId: "",
      videoSearchQuery: "NCERT Class 9 Hindi Kshitij video lecture",
    },
  ],
  "Class 10": [
    {
      subject: "Mathematics",
      icon: "📐",
      color: "from-blue-500 to-blue-600",
      chapters: 15,
      pages: 360,
      pdfUrl: "https://ncert.nic.in/textbook.php?jemh1=0-15",
      onlineReadUrl: "https://ncert.nic.in/textbook.php?jemh1=0-15",
      videoLectureId: "yjBjSymoKpY",
      videoSearchQuery: "NCERT Class 10 Mathematics video lecture Hindi",
    },
    {
      subject: "Science",
      icon: "🔬",
      color: "from-green-500 to-green-600",
      chapters: 16,
      pages: 340,
      pdfUrl: "https://ncert.nic.in/textbook.php?jesc1=0-16",
      onlineReadUrl: "https://ncert.nic.in/textbook.php?jesc1=0-16",
      videoLectureId: "hgjnrwWqE8k",
      videoSearchQuery: "NCERT Class 10 Science video lecture Hindi",
    },
    {
      subject: "Social Science - History",
      icon: "🏛️",
      color: "from-orange-500 to-orange-600",
      chapters: 5,
      pages: 170,
      pdfUrl: "https://ncert.nic.in/textbook.php?jess1=0-5",
      onlineReadUrl: "https://ncert.nic.in/textbook.php?jess1=0-5",
      videoLectureId: "",
      videoSearchQuery:
        "NCERT Class 10 History India and the Contemporary World video lecture Hindi",
    },
    {
      subject: "Social Science - Geography",
      icon: "🌍",
      color: "from-teal-500 to-teal-600",
      chapters: 7,
      pages: 150,
      pdfUrl: "https://ncert.nic.in/textbook.php?jesg1=0-7",
      onlineReadUrl: "https://ncert.nic.in/textbook.php?jesg1=0-7",
      videoLectureId: "",
      videoSearchQuery:
        "NCERT Class 10 Geography Contemporary India video lecture Hindi",
    },
    {
      subject: "English - First Flight",
      icon: "📚",
      color: "from-purple-500 to-purple-600",
      chapters: 11,
      pages: 200,
      pdfUrl: "https://ncert.nic.in/textbook.php?jerh1=0-11",
      onlineReadUrl: "https://ncert.nic.in/textbook.php?jerh1=0-11",
      videoLectureId: "",
      videoSearchQuery: "NCERT Class 10 English First Flight video lecture",
    },
    {
      subject: "Hindi - Kshitij",
      icon: "🔤",
      color: "from-red-500 to-red-600",
      chapters: 17,
      pages: 250,
      pdfUrl: "https://ncert.nic.in/textbook.php?jhkv1=0-17",
      onlineReadUrl: "https://ncert.nic.in/textbook.php?jhkv1=0-17",
      videoLectureId: "",
      videoSearchQuery: "NCERT Class 10 Hindi Kshitij video lecture",
    },
  ],
  "Class 11": [
    {
      subject: "Physics Part 1",
      icon: "⚡",
      color: "from-blue-500 to-blue-600",
      chapters: 8,
      pages: 280,
      pdfUrl: "https://ncert.nic.in/textbook.php?keph1=0-8",
      onlineReadUrl: "https://ncert.nic.in/textbook.php?keph1=0-8",
      videoLectureId: "1OYTUfmLUzA",
      videoSearchQuery: "NCERT Class 11 Physics Part 1 video lecture Hindi",
    },
    {
      subject: "Physics Part 2",
      icon: "⚡",
      color: "from-blue-600 to-blue-700",
      chapters: 7,
      pages: 260,
      pdfUrl: "https://ncert.nic.in/textbook.php?keph2=0-7",
      onlineReadUrl: "https://ncert.nic.in/textbook.php?keph2=0-7",
      videoLectureId: "",
      videoSearchQuery: "NCERT Class 11 Physics Part 2 video lecture Hindi",
    },
    {
      subject: "Chemistry Part 1",
      icon: "🧪",
      color: "from-green-500 to-green-600",
      chapters: 7,
      pages: 240,
      pdfUrl: "https://ncert.nic.in/textbook.php?kech1=0-7",
      onlineReadUrl: "https://ncert.nic.in/textbook.php?kech1=0-7",
      videoLectureId: "iHXB0ZGX1GE",
      videoSearchQuery: "NCERT Class 11 Chemistry Part 1 video lecture Hindi",
    },
    {
      subject: "Chemistry Part 2",
      icon: "🧪",
      color: "from-green-600 to-green-700",
      chapters: 7,
      pages: 220,
      pdfUrl: "https://ncert.nic.in/textbook.php?kech2=0-7",
      onlineReadUrl: "https://ncert.nic.in/textbook.php?kech2=0-7",
      videoLectureId: "",
      videoSearchQuery: "NCERT Class 11 Chemistry Part 2 video lecture Hindi",
    },
    {
      subject: "Mathematics",
      icon: "📐",
      color: "from-purple-500 to-purple-600",
      chapters: 16,
      pages: 400,
      pdfUrl: "https://ncert.nic.in/textbook.php?kemh1=0-16",
      onlineReadUrl: "https://ncert.nic.in/textbook.php?kemh1=0-16",
      videoLectureId: "yjBjSymoKpY",
      videoSearchQuery: "NCERT Class 11 Mathematics video lecture Hindi",
    },
    {
      subject: "Biology",
      icon: "🧬",
      color: "from-pink-500 to-pink-600",
      chapters: 22,
      pages: 380,
      pdfUrl: "https://ncert.nic.in/textbook.php?kebo1=0-22",
      onlineReadUrl: "https://ncert.nic.in/textbook.php?kebo1=0-22",
      videoLectureId: "wENhHnJI1ys",
      videoSearchQuery: "NCERT Class 11 Biology video lecture Hindi",
    },
    {
      subject: "English - Hornbill",
      icon: "📚",
      color: "from-orange-500 to-orange-600",
      chapters: 8,
      pages: 180,
      pdfUrl: "https://ncert.nic.in/textbook.php?kerh1=0-8",
      onlineReadUrl: "https://ncert.nic.in/textbook.php?kerh1=0-8",
      videoLectureId: "",
      videoSearchQuery: "NCERT Class 11 English Hornbill video lecture",
    },
  ],
  "Class 12": [
    {
      subject: "Physics Part 1",
      icon: "⚡",
      color: "from-blue-500 to-blue-600",
      chapters: 8,
      pages: 300,
      pdfUrl: "https://ncert.nic.in/textbook.php?leph1=0-8",
      onlineReadUrl: "https://ncert.nic.in/textbook.php?leph1=0-8",
      videoLectureId: "1OYTUfmLUzA",
      videoSearchQuery: "NCERT Class 12 Physics Part 1 video lecture Hindi",
    },
    {
      subject: "Physics Part 2",
      icon: "⚡",
      color: "from-blue-600 to-blue-700",
      chapters: 6,
      pages: 280,
      pdfUrl: "https://ncert.nic.in/textbook.php?leph2=0-6",
      onlineReadUrl: "https://ncert.nic.in/textbook.php?leph2=0-6",
      videoLectureId: "",
      videoSearchQuery: "NCERT Class 12 Physics Part 2 video lecture Hindi",
    },
    {
      subject: "Chemistry Part 1",
      icon: "🧪",
      color: "from-green-500 to-green-600",
      chapters: 9,
      pages: 260,
      pdfUrl: "https://ncert.nic.in/textbook.php?lech1=0-9",
      onlineReadUrl: "https://ncert.nic.in/textbook.php?lech1=0-9",
      videoLectureId: "iHXB0ZGX1GE",
      videoSearchQuery: "NCERT Class 12 Chemistry Part 1 video lecture Hindi",
    },
    {
      subject: "Chemistry Part 2",
      icon: "🧪",
      color: "from-green-600 to-green-700",
      chapters: 7,
      pages: 240,
      pdfUrl: "https://ncert.nic.in/textbook.php?lech2=0-7",
      onlineReadUrl: "https://ncert.nic.in/textbook.php?lech2=0-7",
      videoLectureId: "",
      videoSearchQuery: "NCERT Class 12 Chemistry Part 2 video lecture Hindi",
    },
    {
      subject: "Mathematics Part 1",
      icon: "📐",
      color: "from-purple-500 to-purple-600",
      chapters: 6,
      pages: 320,
      pdfUrl: "https://ncert.nic.in/textbook.php?lemh1=0-6",
      onlineReadUrl: "https://ncert.nic.in/textbook.php?lemh1=0-6",
      videoLectureId: "yjBjSymoKpY",
      videoSearchQuery: "NCERT Class 12 Mathematics Part 1 video lecture Hindi",
    },
    {
      subject: "Mathematics Part 2",
      icon: "📐",
      color: "from-purple-600 to-purple-700",
      chapters: 7,
      pages: 300,
      pdfUrl: "https://ncert.nic.in/textbook.php?lemh2=0-7",
      onlineReadUrl: "https://ncert.nic.in/textbook.php?lemh2=0-7",
      videoLectureId: "",
      videoSearchQuery: "NCERT Class 12 Mathematics Part 2 video lecture Hindi",
    },
    {
      subject: "Biology",
      icon: "🧬",
      color: "from-pink-500 to-pink-600",
      chapters: 16,
      pages: 360,
      pdfUrl: "https://ncert.nic.in/textbook.php?lebo1=0-16",
      onlineReadUrl: "https://ncert.nic.in/textbook.php?lebo1=0-16",
      videoLectureId: "wENhHnJI1ys",
      videoSearchQuery: "NCERT Class 12 Biology video lecture Hindi",
    },
    {
      subject: "English - Flamingo",
      icon: "📚",
      color: "from-orange-500 to-orange-600",
      chapters: 8,
      pages: 200,
      pdfUrl: "https://ncert.nic.in/textbook.php?lerh1=0-8",
      onlineReadUrl: "https://ncert.nic.in/textbook.php?lerh1=0-8",
      videoLectureId: "",
      videoSearchQuery: "NCERT Class 12 English Flamingo video lecture",
    },
  ],
};

const classOptions = Object.keys(booksByClass);

interface VideoModalProps {
  book: Book | null;
  onClose: () => void;
}

function VideoModal({ book, onClose }: VideoModalProps) {
  const [embedError, setEmbedError] = useState(false);
  const [embedLoaded, setEmbedLoaded] = useState(false);

  if (!book) return null;

  const hasEmbed = !!book.videoLectureId;
  const youtubeUrl = hasEmbed
    ? `https://www.youtube.com/watch?v=${book.videoLectureId}`
    : null;
  const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(book.videoSearchQuery)}`;

  const handleClose = () => {
    onClose();
    setEmbedError(false);
    setEmbedLoaded(false);
  };

  return (
    <Dialog
      open={!!book}
      onOpenChange={(v) => {
        if (!v) handleClose();
      }}
    >
      <DialogContent className="max-w-2xl w-full p-0 overflow-hidden">
        <DialogHeader className="px-5 pt-5 pb-3">
          <DialogTitle className="font-baloo text-lg flex items-center gap-2">
            <Video className="w-5 h-5 text-red-500" />
            {book.subject} — Video Lecture
          </DialogTitle>
        </DialogHeader>
        <div className="px-5 pb-6 space-y-3">
          {/* Embed player — only when videoLectureId exists and no error */}
          {hasEmbed && !embedError && (
            <>
              <div
                className="relative w-full rounded-xl overflow-hidden bg-black"
                style={{ paddingBottom: "56.25%" }}
              >
                {!embedLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/80">
                    <div className="text-white/60 text-sm text-center">
                      <Video className="w-8 h-8 mx-auto mb-2 animate-pulse" />
                      Loading video...
                    </div>
                  </div>
                )}
                <iframe
                  key={book.videoLectureId}
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${book.videoLectureId}?rel=0&modestbranding=1&autoplay=0`}
                  title={`${book.subject} Video Lecture`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  onLoad={() => setEmbedLoaded(true)}
                  onError={() => setEmbedError(true)}
                />
              </div>
              <p className="text-xs text-foreground/40">
                Agar video neeche "unavailable" dikhe toh "YouTube par Search
                Karein" button use karein — wahan zaroor milega.
              </p>
            </>
          )}

          {/* No embed available or embed error */}
          {(!hasEmbed || embedError) && (
            <div className="text-center py-6 bg-foreground/5 rounded-xl">
              <Video className="w-10 h-10 mx-auto mb-2 text-foreground/30" />
              <p className="font-semibold text-foreground/70 text-sm">
                {embedError
                  ? "Yeh video embed nahi ho sakta"
                  : "Video directly yahan available nahi hai"}
              </p>
              <p className="text-xs text-foreground/50 mt-1">
                YouTube par is subject ke bahut saare free lectures hain
              </p>
            </div>
          )}

          {/* Primary CTA: YouTube Search — always shown, always works */}
          <button
            type="button"
            onClick={() =>
              window.open(youtubeSearchUrl, "_blank", "noopener,noreferrer")
            }
            className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold py-3 rounded-xl transition-colors"
          >
            <Search className="w-4 h-4" /> YouTube par "{book.subject}" Lectures
            Dekhein
          </button>

          {/* Secondary: direct link if embed ID exists */}
          {youtubeUrl && (
            <button
              type="button"
              onClick={() =>
                window.open(youtubeUrl, "_blank", "noopener,noreferrer")
              }
              className="w-full flex items-center justify-center gap-2 bg-foreground/5 hover:bg-foreground/10 text-foreground text-sm font-semibold py-2.5 rounded-xl transition-colors"
            >
              <Play className="w-4 h-4" /> Is Video ko YouTube par Dekhen
            </button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function NCERTLibrary() {
  const [selectedClass, setSelectedClass] = useState("Class 10");
  const [search, setSearch] = useState("");
  const [videoBook, setVideoBook] = useState<Book | null>(null);

  const filteredBooks = useMemo(() => {
    const books = booksByClass[selectedClass] || [];
    if (!search.trim()) return books;
    return books.filter((b) =>
      b.subject.toLowerCase().includes(search.toLowerCase()),
    );
  }, [selectedClass, search]);

  return (
    <div className="min-h-screen bg-background">
      {/* Video Modal */}
      <VideoModal book={videoBook} onClose={() => setVideoBook(null)} />

      {/* Header */}
      <div className="gradient-hero px-4 pt-6 pb-12">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-vedansh-orange/20 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-vedansh-orange" />
            </div>
            <div>
              <h1 className="font-baloo font-bold text-2xl text-white">
                NCERT Library
              </h1>
              <p className="text-white/60 text-sm">
                Class 1-12 • All Subjects • Free
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 -mt-6 pb-8 space-y-4">
        {/* Filters */}
        <div className="bg-card border border-border rounded-2xl p-4 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search subjects..."
              className="pl-9"
            />
          </div>
          <Select value={selectedClass} onValueChange={setSelectedClass}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select class" />
            </SelectTrigger>
            <SelectContent>
              {classOptions.map((cls) => (
                <SelectItem key={cls} value={cls}>
                  {cls}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Govt Approved Banner */}
        <div className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-3">
          <img
            src="/assets/generated/govt-approved-stamp.dim_128x128.png"
            alt="Govt Approved"
            className="w-8 h-8 object-contain"
          />
          <div>
            <div className="text-emerald-600 dark:text-emerald-400 font-semibold text-sm">
              Government Approved Content
            </div>
            <div className="text-foreground/50 text-xs">
              All NCERT books are officially approved by MHRD, Govt. of India
            </div>
          </div>
        </div>

        {/* Books Grid */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-foreground">
              {selectedClass} Books
            </h3>
            <span className="text-xs text-foreground/50">
              {filteredBooks.length} books
            </span>
          </div>

          {filteredBooks.length === 0 ? (
            <div className="text-center py-12 text-foreground/50">
              <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>No books found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredBooks.map((book) => (
                <div
                  key={book.subject}
                  className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-glass transition-all duration-200"
                >
                  {/* Book Cover */}
                  <div
                    className={`bg-gradient-to-br ${book.color} p-6 flex items-center justify-center`}
                  >
                    <div className="text-center">
                      <div className="text-4xl mb-2">{book.icon}</div>
                      <div className="text-white font-bold text-sm text-center leading-tight">
                        {book.subject}
                      </div>
                      <div className="text-white/70 text-xs mt-1">
                        {selectedClass}
                      </div>
                    </div>
                  </div>

                  {/* Book Info */}
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="font-semibold text-foreground text-sm">
                          {book.subject}
                        </div>
                        <div className="text-foreground/50 text-xs">
                          {book.chapters} chapters • {book.pages} pages
                        </div>
                      </div>
                      <span className="inline-flex items-center gap-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 rounded-full px-2 py-0.5 text-xs font-semibold">
                        <CheckCircle className="w-3 h-3" /> Approved
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 mb-2">
                      <button
                        type="button"
                        onClick={() =>
                          window.open(
                            book.onlineReadUrl,
                            "_blank",
                            "noopener,noreferrer",
                          )
                        }
                        className="flex-1 flex items-center justify-center gap-1.5 bg-vedansh-orange/10 text-vedansh-orange text-xs font-semibold py-2 rounded-lg hover:bg-vedansh-orange/20 transition-colors"
                      >
                        <ExternalLink className="w-3 h-3" /> Read Online
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          window.open(
                            book.onlineReadUrl,
                            "_blank",
                            "noopener,noreferrer",
                          );
                          toast.info(
                            "NCERT website khul rahi hai — chapter select karke PDF download karein",
                          );
                        }}
                        className="flex-1 flex items-center justify-center gap-1.5 bg-blue-500/10 text-blue-500 text-xs font-semibold py-2 rounded-lg hover:bg-blue-500/20 transition-colors"
                      >
                        <Download className="w-3 h-3" /> Download PDF
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => setVideoBook(book)}
                      className="w-full flex items-center justify-center gap-1.5 bg-red-500/10 text-red-500 text-xs font-semibold py-2 rounded-lg hover:bg-red-500/20 transition-colors"
                    >
                      <Video className="w-3 h-3" /> Watch Lecture
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
