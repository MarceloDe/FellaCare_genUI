import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';

const placeholderPosts = [
  {
    username: 'HealthcarePro1',
    avatar: 'HP',
    text: 'Just reviewed the new PPO plans for 2024. Some interesting changes in co-pays for specialist visits. #HealthInsurance #OpenEnrollment',
    image: 'https://placehold.co/600x400.png',
    imageHint: 'medical chart'
  },
  {
    username: 'WellnessGuru',
    avatar: 'WG',
    text: 'Reminder: Your mental health is just as important as your physical health. Many insurance plans now offer great mental health coverage!',
    image: null,
    imageHint: null
  },
  {
    username: 'FinanceBro',
    avatar: 'FB',
    text: 'Thinking about switching to a High Deductible Health Plan (HDHP) with an HSA? Let\'s break down the pros and cons.',
    image: 'https://placehold.co/600x300.png',
    imageHint: 'piggy bank money'
  },
  {
    username: 'FamilyFirst',
    avatar: 'FF',
    text: 'Comparing family plans is tough! Does anyone have experience with adding a newborn to their policy mid-year?',
    image: 'https://placehold.co/600x450.png',
    imageHint: 'family smiling'
  },
  {
    username: 'Dr. Emily Carter',
    avatar: 'EC',
    text: 'Annual check-ups are crucial for preventative care. Most plans cover them 100%. Don\'t forget to schedule yours!',
    image: null,
    imageHint: null
  },
];

export function SocialFeed() {
  return (
    <div className="max-w-2xl mx-auto py-4">
      <div className="space-y-4">
        {placeholderPosts.map((post, index) => (
          <Card key={index} className="overflow-hidden transition-shadow hover:shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <Avatar>
                  <AvatarImage src={`https://placehold.co/40x40.png?text=${post.avatar}`} />
                  <AvatarFallback>{post.avatar}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-semibold">{post.username}</p>
                  <p className="text-sm text-foreground/90 mt-1">{post.text}</p>
                </div>
              </div>
              {post.image && (
                <div className="mt-4 rounded-lg overflow-hidden">
                  <Image
                    src={post.image}
                    alt="Post image"
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover"
                    data-ai-hint={post.imageHint || ''}
                  />
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
