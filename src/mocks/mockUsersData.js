export const mockUsersDiff = {
  code: 200,
  data: [
    {
      id: "e28d290a-a2f2-48c2-9001-ff43884e271b",
      timestamp: 1581631200000,
      diff: [
        {
          field: "name",
          oldValue: "John",
          newValue: "Bruce",
        },
      ],
    },
    {
      id: "8bd0166f-f0c6-48fd-9fcd-a17e76eb1e92",
      timestamp: 1581717600000,
      diff: [
        {
          field: "name",
          oldValue: "Bruce",
          newValue: "Nick",
        },
      ],
    },
    {
      id: "0a75a2b3-be64-4aeb-ba4c-8ddb913791ac",
      timestamp: 1581804000000,
      diff: [
        {
          field: "name",
          oldValue: "Nick",
          newValue: "Michel",
        },
      ],
    },
  ],
  limit: 3,
  offset: 0,
  total: 10,
};

export const mockUsersDiffError = {
  code: 500,
  error: "Uknown error",
};
