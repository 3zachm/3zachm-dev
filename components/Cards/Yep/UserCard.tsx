import { Link, Text } from '@nextui-org/react';
import CountUp from 'react-countup';
import useSWR from 'swr';
import { Loading } from '@nextui-org/react';

const fetcher = (url: string) => fetch(url).then((r) => r.json());
const easeOutElastic = (t: number, b: number, c: number, d: number): number => {
    var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
};

function UserCard() {
    const { data, error } = useSWR('/api/anny/counts', fetcher);
    const loadSpinner = <Loading type="points-opacity" />;
    let content: React.ReactNode = null;
    // on db fetch error
    if (error) return <Text>failed to load ;w;</Text>;
    // waiting for api call
    else if (!data) content = "";
    // display data
    if (data) content = <div>{data.count} {data.yep} {data.cock} </div>;
    return (
        <div className="flex flex-col max-w-[600px] min-w-[27vw] bg-black rounded-md p-10 z-[10] shadow-lg backdrop-blur bg-opacity-40 justify-center select-none">
            <Text size={30} className="text-white">
                    There have been
            </Text>
            <div className="w-100 flex flex-row items-baseline justify-start">
                <Text h1 size={90} css={{ textGradient: '45deg, $purple500 -20%, $pink300 100%' }} weight="bold" className="text-white pr-4">
                    {(content == "" ) ? loadSpinner: <CountUp end={data.yep} separator="," duration={2.0} easingFn={easeOutElastic}/>}
                </Text>
                <Text size={30} className="text-white">
                    yeps
                </Text>
            </div>
            <div className="w-100 flex flex-row items-baseline justify-start">
                <Text h1 size={70} css={{ textGradient: '45deg, $purple500 -20%, $pink300 100%' }} weight="bold" className="text-white pr-4">
                    {(content == "" ) ? loadSpinner: <CountUp end={data.cock} separator="," duration={2.0} easingFn={easeOutElastic}/>}
                </Text>
                <Text size={30} className="text-white">
                    🐔&apos;s from 
                </Text>
            </div>
            <div className="w-100 flex flex-row items-baseline justify-start">
                <Text h1 size={50} css={{ textGradient: '45deg, $purple500 -20%, $pink300 100%' }} weight="bold" className="text-white pr-4">
                    {(content == "" ) ? loadSpinner: <CountUp end={data.count} separator="," duration={2.0} easingFn={easeOutElastic}/>}
                </Text>
                <Text size={30} className="text-white">
                    users in <Link href="https://twitch.tv/anny" className='pointer-events-auto'>twitch.tv/anny</Link>
                </Text>
            </div>
            
        </div>
    );
}

export default UserCard;