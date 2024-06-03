import dbConnect from '@/app/libs/db';
import Counter from '@/app/models/counter';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await dbConnect();
    const counter = await Counter.findOne();
    return NextResponse.json({ count: counter ? counter.count : 0 });
  } catch (error) {
    console.error('Error fetching counters:', error);
    return NextResponse.json({ message: 'Error fetching counters' });
  }
};

export async function POST() {
    try {
        await dbConnect();
        const counter = await Counter.findOneAndUpdate({}, { $inc: { count: 1 } }, { new: true, upsert: true });
        return NextResponse.json({ count: counter.count });
    }
    catch(error){
        console.error('Error posting counters:', error);
        return NextResponse.json({ message: 'Error posting counters' });
    }
}

/*const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();

  switch (req.method) {
    case 'GET':
      const counters = await Counter.find({});
      res.status(200).json(counters);
      break;
    case 'POST':
      const newCounter = new Counter(req.body);
      await newCounter.save();
      res.status(201).json(newCounter);
      break;
    case 'PUT':
      const { id } = req.query;
      const updatedCounter = await Counter.findByIdAndUpdate(id, req.body, { new: true });
      res.status(200).json(updatedCounter);
      break;
    default:
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;*/