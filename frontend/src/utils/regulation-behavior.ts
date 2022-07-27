import { Networks } from "@/types/networks";
import { IRegulations } from "@/types/requlation";

export default function getRegulation(network: Networks): IRegulations {
  switch (network) {
    case "watsapp":
      return {
        maxlen: 1000,
        button: {
          maxcount: 10,
          maxlen: 20,
          link: {
            have: false,
          },
        },
        inlineButton: {
          maxcount: 3,
          maxlen: 20,
          link: {
            have: true,
            count: 1,
          },
        },
      };
    case "vk":
      return {
        maxlen: 4096,
        button: {
          maxcount: 40,
          maxlen: undefined,
          link: {
            have: true,
          },
        },
        inlineButton: {
          maxcount: 10,
          maxlen: undefined,
          link: {
            have: true,
          },
        },
      };
    case "telegram":
      return {
        maxlen: 4096,
        button: {
          maxcount: undefined,
          maxlen: undefined,
          link: {
            have: false,
          },
        },
        inlineButton: {
          maxcount: undefined,
          maxlen: 64,
          link: {
            have: true,
          },
        },
      };
  }
}
