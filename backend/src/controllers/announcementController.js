import Announcement from '../models/Announcement.js';
import User from '../models/User.js';
import { sendMail } from '../utils/email.js';

export async function createAnnouncement(req, res) {
  const announcement = await Announcement.create({
    ...req.body,
    createdBy: req.user._id
  });

  const students = await User.find({ role: 'student' }).select('email');
  await Promise.all(
    students
      .filter((s) => s.email)
      .map((s) =>
        sendMail({
          to: s.email,
          subject: `New Notice: ${announcement.title}`,
          html: `<p>${announcement.message}</p>`
        })
      )
  );

  res.status(201).json(announcement);
}

export async function listAnnouncements(req, res) {
  const audience = req.user.role === 'admin' ? ['all', 'admin'] : ['all', 'student'];
  const announcements = await Announcement.find({ audience: { $in: audience } }).sort({ createdAt: -1 });
  res.json(announcements);
}
