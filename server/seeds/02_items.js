/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  // await knex('items').del()
  await knex.schema.raw('TRUNCATE TABLE items RESTART IDENTITY CASCADE')
  await knex('items').insert([
    {
      user_Id: 1,
      item_name: 'Invisible Tape',
      description: "Aliqua eiusmod laborum magna esse non aute dolor id commodo cillum.",
      quantity: 24
    },
    {
      user_Id: 1,
      item_name: 'Paperclips',
      description: "Reprehenderit proident quis ad commodo consequat nisi anim. Lorem labore nisi non eiusmod.",
      quantity: 100
    },
    {
      user_Id: 1,
      item_name: 'Shipping Labels',
      description: "Ad qui fugiat cupidatat nulla cupidatat eu aliquip consectetur mollit.",
      quantity: 75
    },
    {
      user_Id: 1,
      item_name: 'Binder Clips',
      description: "Culpa tempor pariatur aliqua ex qui est veniam excepteur. Eiusmod nulla enim velit nostrud do anim eu in.",
      quantity: 60
    },
    {
      user_Id: 1,
      item_name: 'Highlighters (Pack of 5)',
      description: "Enim aute ex fugiat do nostrud cupidatat dolore duis anim nulla sit minim.",
      quantity: 15
    },
    {
      user_Id: 1,
      item_name: 'Desk Organizer',
      description: "Et deserunt labore non officia laborum eiusmod.",
      quantity: 10
    },
    {
      user_Id: 1,
      item_name: 'Sticky Notes',
      description: "Minim fugiat irure eiusmod consectetur eiusmod irure cupidatat pariatur est occaecat consequat duis consequat.",
      quantity: 200
    },
    {
      user_Id: 1,
      item_name: 'Mouse Pad',
      description: "Ipsum do ipsum amet dolore minim officia veniam aute officia magna ullamco.",
      quantity: 25
    },
    {
      user_Id: 1,
      item_name: 'Whiteboard Markers',
      description: "Consequat incididunt consectetur fugiat veniam deserunt occaecat enim.",
      quantity: 30
    },
    {
      user_Id: 1,
      item_name: 'Correction Tape',
      description: "Irure minim aliquip non est sunt dolor et sit voluptate. Incididunt in tempor adipisicing sunt non elit aliquip ipsum nisi.",
      quantity: 18
    },
    {
      user_Id: 2,
      item_name: 'Standard Stapler',
      description: "Laborum anim do qui nisi.",
      quantity: 7
    },
    {
      user_Id: 2,
      item_name: 'Lined Notebook',
      description: "Minim occaecat id consectetur fugiat. Nostrud qui laborum adipisicing quis elit id culpa ex sit dolore id elit sunt.",
      quantity: 30
    },
    {
      user_Id: 2,
      item_name: 'Assorted Pens',
      description: "Sit minim nulla anim duis cillum non qui ut laborum deserunt consequat veniam proident sunt.",
      quantity: 15
    },
    {
      user_Id: 2,
      item_name: 'Desk Lamp',
      description: "Aliquip nisi labore anim sint culpa ipsum eu laborum cillum voluptate deserunt est eu et.",
      quantity: 12
    },
    {
      user_Id: 2,
      item_name: 'USB Flash Drives (16GB)',
      description: "ex officia consectetur ullamco in aute. Cupidatat velit in quis ex.",
      quantity: 40
    },
    {
      user_Id: 2,
      item_name: 'Cable Organizer',
      description: "Reprehenderit do do elit esse duis sunt. Labore qui mollit adipisicing nostrud. Nostrud deserunt in sunt id est ea sit laboris nostrud.",
      quantity: 20
    },
    {
      user_Id: 2,
      item_name: 'Screen Wipes',
      description: "in incididunt ex duis in officia esse. Do sunt officia do culpa aliqua commodo anim ex nisi sit occaecat labore.",
      quantity: 50
    },
    {
      user_Id: 2,
      item_name: 'Mini Trash Bin',
      description: "Reprehenderit eiusmod cillum aliqua ut laborum mint ipsum. Fugiat exercitation non aute consequat duis.",
      quantity: 14
    },
    {
      user_Id: 2,
      item_name: 'Push Pins',
      description: "Consectetur eiusmod adipisicing velit tempor sunt irure.",
      quantity: 100
    },
    {
      user_Id: 2,
      item_name: 'Wall Clock',
      description: "exercitation consequat est nisi aliqua cillum eiusmod dolore nostrud officia magna incididunt enim.",
      quantity: 8
    },
  ]);
};