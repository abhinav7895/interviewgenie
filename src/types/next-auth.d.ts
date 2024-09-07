import "next-auth"

declare module "next-auth" {
    interface Session extends DefaultSession {
      user: {
        id: string,
        name: string,
        email: string, 
        image: string
      } & DefaultSession["user"]
    }
  
    interface User {
      id: string,
      name: string,
      email: string, 
      image: string
    }
  }
  
  declare module "next-auth/jwt" {
    interface JWT {
      id: string,
      name: string,
      email: string, 
      image: string
    }
  }