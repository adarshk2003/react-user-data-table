/**
 * SERVER MODEL: UserModel (Data Layer & Domain Logic)
 * Manages user data state and database interactions.
 */

let usersDatabase = [
  {
    id: 1,
    name: 'Leanne Graham',
    username: 'Bret',
    email: 'Sincere@april.biz',
    phone: '1-770-736-8031 x56442',
    website: 'hildegard.org',
    company: 'Romaguera-Crona',
    department: 'Engineering',
    role: 'Frontend Lead',
    status: 'Active',
    city: 'Gwenborough',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Leanne'
  },
  {
    id: 2,
    name: 'Ervin Howell',
    username: 'Antonette',
    email: 'Shanna@melissa.tv',
    phone: '010-692-6593 x09125',
    website: 'anastasia.net',
    company: 'Deckow-Crist',
    department: 'Design',
    role: 'UI/UX Specialist',
    status: 'Active',
    city: 'Wisokyburgh',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ervin'
  },
  {
    id: 3,
    name: 'Clementine Bauch',
    username: 'Samantha',
    email: 'Nathan@yesenia.net',
    phone: '1-463-123-4447',
    website: 'ramiro.info',
    company: 'Romaguera-Jacobson',
    department: 'Product',
    role: 'Product Manager',
    status: 'Pending',
    city: 'McKenziehaven',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Clementine'
  },
  {
    id: 4,
    name: 'Patricia Lebsack',
    username: 'Karianne',
    email: 'Julianne.OConner@kory.org',
    phone: '493-170-9623 x156',
    website: 'kale.biz',
    company: 'Robel-Corkery',
    department: 'Marketing',
    role: 'Marketing Lead',
    status: 'Active',
    city: 'South Elvis',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Patricia'
  },
  {
    id: 5,
    name: 'Chelsey Dietrich',
    username: 'Kamren',
    email: 'Lucio_Hettinger@annie.ca',
    phone: '(254)954-1289',
    website: 'demond.biz',
    company: 'Keebler LLC',
    department: 'Engineering',
    role: 'Backend Architect',
    status: 'Inactive',
    city: 'Roscoeview',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Chelsey'
  },
  {
    id: 6,
    name: 'Dennis Schulist',
    username: 'Leopoldo_Corkery',
    email: 'Karley_Dach@jasper.info',
    phone: '1-477-935-8478 x6430',
    website: 'ola.org',
    company: 'Considine-Lockman',
    department: 'Finance',
    role: 'Financial Analyst',
    status: 'Active',
    city: 'South Christy',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dennis'
  },
  {
    id: 7,
    name: 'Kurtis Weissnat',
    username: 'Elwyn.Skiles',
    email: 'Telly.Hoeger@billy.biz',
    phone: '210.067.6132',
    website: 'elvis.io',
    company: 'Johns Group',
    department: 'Sales',
    role: 'Account Executive',
    status: 'Active',
    city: 'Howemouth',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kurtis'
  },
  {
    id: 8,
    name: 'Nicholas Runolfsdottir V',
    username: 'Maxime_Nienow',
    email: 'Sherwood@rosamond.me',
    phone: '586.493.6943 x140',
    website: 'jacynthe.com',
    company: 'Abernathy Group',
    department: 'Product',
    role: 'UX Researcher',
    status: 'Pending',
    city: 'Aliyaview',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nicholas'
  }
];

let nextId = 9;

export const UserModel = {
  // REST GET /api/users
  findAll() {
    return usersDatabase;
  },

  // REST GET /api/users/:id
  findById(id) {
    return usersDatabase.find(u => u.id === Number(id));
  },

  // REST POST /api/users
  create(data) {
    const newUser = {
      id: nextId++,
      name: data.name,
      username: data.username || data.email.split('@')[0],
      email: data.email,
      phone: data.phone || '+1 (555) 019-2834',
      website: data.website || 'example.com',
      company: data.company || 'Innovate Tech',
      department: data.department || 'Engineering',
      role: data.role || 'Software Engineer',
      status: data.status || 'Active',
      city: data.city || 'San Francisco',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(data.name)}`
    };
    usersDatabase.unshift(newUser);
    return newUser;
  },

  // REST PUT /api/users/:id
  update(id, data) {
    const index = usersDatabase.findIndex(u => u.id === Number(id));
    if (index === -1) return null;

    usersDatabase[index] = {
      ...usersDatabase[index],
      ...data,
      id: Number(id)
    };
    return usersDatabase[index];
  },

  // REST DELETE /api/users/:id
  delete(id) {
    const index = usersDatabase.findIndex(u => u.id === Number(id));
    if (index === -1) return false;
    usersDatabase.splice(index, 1);
    return true;
  }
};

export default UserModel;
