import MeetingTypeList from '@/components/MeetingTypeList';
import RealTimeClock from '@/components/RealTimeClok';

export const dynamic = 'force-static';

const Home = () => {

  return (
    <section className="flex size-full flex-col gap-5 text-white">
      <div className="h-[303px] w-full rounded-[20px] bg-hero bg-cover">

        <RealTimeClock />
      </div>

      <MeetingTypeList />
    </section>
  );
};

export default Home;
