import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SeoService } from '../services/seo.service'; // <-- Fixed: Single '../' instead of '../../'

export interface DonationTier {
  amount: number;
  label: string;
  sanskritTitle: string;
  impact: string;
  popular?: boolean;
}

export interface SevaPillar {
  id: string;
  title: string;
  sanskritName: string;
  description: string;
  icon: string;
  image: string;
  allocatedPercent: number;
  raisedAmount: number;
  targetAmount: number;
}

export interface SankalpaDonor {
  name: string;
  location: string;
  gotra?: string;
  amount: number;
  sevaCause: string;
  timeAgo: string;
}

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  selector: 'app-fundraiser-page',
  styleUrl: './fundraiser-page.css',
  templateUrl: './fundraiser-page.html',
})
export class FundraiserPage {
  // Campaign Goals & Metrics
  readonly targetGoal = 5100000; // ₹51 Lakhs
  readonly raisedAmount = signal<number>(3842100);
  readonly donorCount = signal<number>(1428);
  readonly daysLeft = signal<number>(21);

  // Donation State
  readonly donationType = signal<'one-time' | 'monthly'>('one-time');
  readonly selectedTierIndex = signal<number>(1);
  readonly customAmountInput = signal<string>('');
  readonly isCustom = signal<boolean>(false);
  readonly selectedCauseId = signal<string>('all');

  // Donor Sankalpa Form Fields
  donorName = '';
  donorEmail = '';
  donorPhone = '';
  donorPan = '';
  donorGotra = '';
  donorNakshatra = '';
  taxExemptionRequired = true;
  anonymousDonation = false;
  readonly isSubmitted = signal<boolean>(false);

  // FAQ Accordion
  readonly openFaq = signal<number | null>(0);

  readonly tiers: DonationTier[] = [
    {
      amount: 1100,
      label: 'Shudraka Daan',
      sanskritTitle: 'अन्नदानम् • Annadanam',
      impact: 'Feeds 21 sadhus and Vedic vidyarthis along the sacred Ganga Ghats in Rishikesh.',
    },
    {
      amount: 5100,
      label: 'Granth Sanrakshan',
      sanskritTitle: 'शास्त्र रक्षा • Shastra Raksha',
      impact: 'Digitizes and chemically preserves 5 decaying palm-leaf Vedic astrology manuscripts.',
      popular: true,
    },
    {
      amount: 11000,
      label: 'Vidyarthi Poshan',
      sanskritTitle: 'विद्यार्थी सेवा • Gurukul Seva',
      impact: 'Provides one full month of residential Gurukul education, food, and Shastras for a Vedic scholar.',
    },
    {
      amount: 25000,
      label: 'Gau Seva & Rasashala',
      sanskritTitle: 'गो सेवा • Cow Sanctuary',
      impact: 'Supports pure Desi Gir cow fodder and Ayurvedic botanical herbal gardens for 3 months.',
    },
    {
      amount: 51000,
      label: 'Tamra-Patra Mahasankalpa',
      sanskritTitle: 'ताम्रपत्र समर्पण • Bronze Inscription',
      impact: 'Permanent bronze tablet inscription of your family Gotra inside the sanctum library altar.',
    },
  ];

  readonly sevaPillars: SevaPillar[] = [
    {
      id: 'shastra',
      title: 'Palm-Leaf & Birch Manuscript Digitization',
      sanskritName: 'प्राचीन ग्रन्थ संरक्षण',
      description: 'Preserving over 4,200 rare, unpublished Sharada and Devanagari manuscripts on Nadi astrology, AyurJyotish, and non-demolition Vastu before brittle decay.',
      icon: 'fa-scroll',
      image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80',
      allocatedPercent: 40,
      raisedAmount: 1536840,
      targetAmount: 2040000,
    },
    {
      id: 'gurukul',
      title: 'Free Veda & Jyotish Pathshala Gurukul',
      sanskritName: 'निःशुल्क वेद पाठशाला',
      description: 'Providing food, clothing, housing, and 12-year traditional shastric education to 60 dedicated young scholars in our Rishikesh Ashram without charging tuition.',
      icon: 'fa-graduation-cap',
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
      allocatedPercent: 35,
      raisedAmount: 1344735,
      targetAmount: 1785000,
    },
    {
      id: 'annadanam',
      title: 'Daily Sadhu & Pilgrim Annadanam',
      sanskritName: 'नित्य अन्नक्षेत्र सेवा',
      description: 'Serving hot, sattvic Ayurvedic meals twice daily to wandering sannyasins, pilgrims, and elderly seekers meditating across Uttarakhand foothills.',
      icon: 'fa-bowl-rice',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
      allocatedPercent: 25,
      raisedAmount: 960525,
      targetAmount: 1275000,
    },
  ];

  readonly recentDonors: SankalpaDonor[] = [
    {
      name: 'Rajesh & Meenakshi Sharma',
      location: 'Bengaluru, India',
      gotra: 'Bharadwaja Gotra',
      amount: 51000,
      sevaCause: 'Tamra-Patra Mahasankalpa',
      timeAgo: '18 mins ago',
    },
    {
      name: 'Dr. Vivek Swaminathan',
      location: 'London, UK',
      gotra: 'Kashyapa Gotra',
      amount: 11000,
      sevaCause: 'Gurukul Vidyarthi Poshan',
      timeAgo: '1 hour ago',
    },
    {
      name: 'Anonymous Seeker',
      location: 'Jaipur, India',
      amount: 5100,
      sevaCause: 'Palm-Leaf Granth Preservation',
      timeAgo: '3 hours ago',
    },
    {
      name: 'Sunil & Anita Kulkarni',
      location: 'Pune, India',
      gotra: 'Vashistha Gotra',
      amount: 25000,
      sevaCause: 'Gau Seva Sanctuary',
      timeAgo: '5 hours ago',
    },
    {
      name: 'Devanand Joshi',
      location: 'California, USA',
      gotra: 'Sandilya Gotra',
      amount: 11000,
      sevaCause: 'Daily Sadhu Annadanam',
      timeAgo: '7 hours ago',
    },
  ];

  readonly faqs = [
    {
      question: 'Is my donation tax-deductible under 80G?',
      answer: 'Yes. All donations to Maharishi Kapi Vedic Trust are 50% tax-exempt under Section 80G of the Indian Income Tax Act. An automated 80G certificate with Form 10BE filing reference is sent to your registered email immediately.',
    },
    {
      question: 'How is the Sankalpa performed in my family name?',
      answer: 'For all offerings of ₹1,100 and above, Acharya Alok Awasthi and the Gurukul priests chant your family name, Gotra, and Janma Nakshatra during the daily morning Ganga Surya Havan in Rishikesh. You receive recorded sanctum darshan via WhatsApp/Email.',
    },
    {
      question: 'Do you accept donations from outside India (NRI/Foreign cards)?',
      answer: 'Yes. We accept all major international debit/credit cards, wire transfers, and PayPal. For international transfers requiring FCRA compliance, our institutional bank coordinates are provided on the confirmation voucher.',
    },
    {
      question: 'Can I visit the Gurukul and verify where my contribution went?',
      answer: 'You are warmly invited to Rishikesh at any time of the year. Donors can sit with the Vidyarthis, inspect the manuscript preservation lab, take prasad in the Annakshetra, and stay in our guest ashram rooms.',
    },
  ];

  readonly progressPercent = computed(() => {
    return Math.min(100, Math.round((this.raisedAmount() / this.targetGoal) * 100));
  });

  readonly currentSelectedAmount = computed(() => {
    if (this.isCustom()) {
      const val = parseInt(this.customAmountInput(), 10);
      return isNaN(val) ? 0 : val;
    }
    return this.tiers[this.selectedTierIndex()]?.amount ?? 0;
  });

  selectTier(index: number): void {
    this.isCustom.set(false);
    this.selectedTierIndex.set(index);
    this.customAmountInput.set('');
  }

  enableCustomAmount(): void {
    this.isCustom.set(true);
  }

  toggleDonationType(type: 'one-time' | 'monthly'): void {
    this.donationType.set(type);
  }

  toggleFaq(index: number): void {
    this.openFaq.update((curr) => (curr === index ? null : index));
  }

  formatCurrency(value: number): string {
    return '₹' + value.toLocaleString('en-IN');
  }

  processSankalpaPayment(event: Event): void {
    event.preventDefault();
    if (this.currentSelectedAmount() > 0 && this.donorName && this.donorEmail) {
      this.isSubmitted.set(true);
    }
  }

  constructor(private readonly seo: SeoService) {
    this.seo.setPageSeo({
      title: 'Maha Sankalpa Fundraiser | Preserve Vedic Shastras & Gurukul Seva',
      description: 'Support the preservation of 4,000+ ancient palm-leaf Vedic manuscripts, free residential education for Gurukul scholars, and daily Ganga Annadanam.',
      path: '/donate',
      keywords: 'Vedic donation, 80G tax exemption spiritual, Gurukul donation India, Shastra preservation, Annadanam Rishikesh',
    });
  }
}