const bcrypt = require('bcrypt')
const { User, Blog } = require('../models')
const { connectToDb } = require('./db')

const seed = async () => {
  await connectToDb()
  console.log('Connected to database')

  const usersData = [
    {
      name: 'Anomander Rake',
      username: 'rake@moonspawn.org',
      password: 'dragnipur',
      blogs: [
        {
          title: 'Reflections on Moon’s Spawn',
          author: 'Anomander Rake',
          url: 'https://moonspawn.org/reflections',
          likes: 1200,
          year: 2001,
        },
        {
          title: 'The Weight of Leadership',
          author: 'Anomander Rake',
          url: 'https://moonspawn.org/leadership',
          likes: 800,
          year: 2010,
        },
      ],
    },
    {
      name: 'Karsa Orlong',
      username: 'karsa@toblakai.com',
      password: 'chainsawjustice',
      blogs: [
        {
          title: 'On Strength and Chains',
          author: 'Karsa Orlong',
          url: 'https://toblakai.com/strength',
          likes: 500,
          year: 1995,
        },
        {
          title: 'Civilization is a Lie',
          author: 'Karsa Orlong',
          url: 'https://toblakai.com/civilization',
          likes: 650,
          year: 2005,
        },
        {
          title: 'Journey of a Toblakai',
          author: 'Karsa Orlong',
          url: 'https://toblakai.com/journey',
          likes: 720,
          year: 2012,
        },
      ],
    },
    {
      name: 'Quick Ben',
      username: 'quickben@bridgeburners.net',
      password: 'sevenwarrens',
      blogs: [
        {
          title: 'The Subtleties of Sorcery',
          author: 'Quick Ben',
          url: 'https://bridgeburners.net/sorcery',
          likes: 900,
          year: 2000,
        },
        {
          title: 'Deceit and Survival',
          author: 'Quick Ben',
          url: 'https://bridgeburners.net/deceit',
          likes: 430,
          year: 2015,
        },
      ],
    },
    {
      name: 'Fiddler',
      username: 'fiddler@bridgeburners.net',
      password: 'sapmaster',
      blogs: [
        {
          title: 'On Music and Moranth Munitions',
          author: 'Fiddler',
          url: 'https://bridgeburners.net/music',
          likes: 300,
          year: 1998,
        },
        {
          title: 'Tales from the Marches',
          author: 'Fiddler',
          url: 'https://bridgeburners.net/marches',
          likes: 270,
          year: 2008,
        },
      ],
    },
    {
      name: 'Icarium Lifestealer',
      username: 'icarium@jhag.org',
      password: 'memorylost',
      blogs: [
        {
          title: 'Fragments of a Forgotten Past',
          author: 'Icarium Lifestealer',
          url: 'https://jhag.org/fragments',
          likes: 1100,
          year: 1991,
        },
        {
          title: 'The Weight of Time',
          author: 'Icarium Lifestealer',
          url: 'https://jhag.org/time',
          likes: 950,
          year: 2020,
        },
      ],
    },
  ]

  for (const userData of usersData) {
    const passwordHash = await bcrypt.hash(userData.password, 10)
    const user = await User.create({
      name: userData.name,
      username: userData.username,
      passwordHash,
    })

    for (const blogData of userData.blogs) {
      await Blog.create({
        ...blogData,
        userId: user.id,
      })
    }
  }

  console.log('Seed completed successfully')
  process.exit(0)
}

seed().catch((err) => {
  console.error('Error seeding:', err)
  process.exit(1)
})
