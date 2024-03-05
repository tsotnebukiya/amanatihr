type Employee = {
  birthday: Date;
  image_url: string;
  name: string;
  surname: string;
  id: string;
};

type Attendance = {
  id: string;
  check_in: boolean;
  created_at: Date;
  office_id: string;
  timestamp: Date;
  user_id: string;
};
