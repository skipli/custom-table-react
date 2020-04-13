export const mockProjectsDiff = {
  code: 200,
  data: [
    {
      id: "01fa742c-b2d0-416a-9394-a0a5dc8bc13e",
      timestamp: 1581717600000,
      diff: [
        {
          field: "name",
          oldValue: "Angrier Birds",
          newValue: "Angry Birds 2",
        },
      ],
    },
    {
      id: "7ba38998-0247-4de9-a3d8-e20cf736e834",
      timestamp: 1581631200000,
      diff: [
        {
          field: "name",
          oldValue: "Angry Birds",
          newValue: "Angrier Birds",
        },
      ],
    },
    {
      id: "c72d77f1-6e0b-473e-a600-7295d0822e54",
      timestamp: 1581804000000,
      diff: [
        {
          field: "name",
          oldValue: "Angry Birds 2",
          newValue: "Angry Birds 2: The sequel",
        },
      ],
    },
  ],
  limit: 3,
  offset: 0,
  total: 5,
};

export const mockProjectsDiffError = {
  code: 500,
  error: "Uknown error",
};
