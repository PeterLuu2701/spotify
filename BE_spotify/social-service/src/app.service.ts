import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private prismaService: PrismaService) {}

  async createComment(user: any, content: string, song_id: number) {
    try {
      console.log('Token:', user);

      const userId = user.userId;
      console.log('User ID:', userId);

      const comment = await this.prismaService.comments.create({
        data: {
          user_id: Number(userId),
          content,
          song_id,
          comment_date: new Date(),
        },
      });

      return comment;
    } catch (error) {
      throw error;
    }
  }

  async getAllComments() {
    try {
      const allComments = await this.prismaService.comments.findMany();
      return allComments;
    } catch (error) {
      throw new Error('Failed to get all artists');
    }
  }

  async editComment(user: any, id: number, content: string, song_id: number) {
    try {
      console.log('Token:', user);

      const userId = user.userId;
      console.log('User ID:', userId);

      const checkUser = await this.prismaService.comments.findUnique({
        where: {
          id,
          song_id,
          user_id: Number(userId),
        },
      });

      if (!checkUser) {
        return 'You can edit your comments only';
      } else {
        const commentToEdit = await this.prismaService.comments.update({
          where: {
            id,
          },
          data: {
            content,
            comment_date: new Date(),
          },
        });

        return commentToEdit;
      }
    } catch (error) {
      throw error;
    }
  }

  async deleteComment(user: any, id: number) {
    try {
      console.log('Token:', user);

      const userId = user.userId;
      console.log('User ID:', userId);

      const checkUser = await this.prismaService.comments.findUnique({
        where: {
          id,
          user_id: Number(userId),
        },
      });

      if (!checkUser) {
        return 'You can delete your comments only';
      } else {
        const commentToDelete = await this.prismaService.comments.delete({
          where: {
            id,
          },
        });

        return commentToDelete;
      }
    } catch (error) {
      throw error;
    }
  }

  async createArtistFollow(user: any, artist_id: number) {
    try {
      console.log('Token:', user);

      const userId = user.userId;
      console.log('User ID:', userId);

      const checkFolloing = await this.prismaService.follows.findFirst({
        where: {
          artist_id,
          user_id: Number(userId),
        },
      });

      if (checkFolloing) {
        return 'You are already following this artist';
      } else {
        const follow = await this.prismaService.follows.create({
          data: {
            artist_id,
            user_id: Number(userId),
            follow_date: new Date(),
          },
        });

        return follow;
      }
    } catch (error) {
      throw error;
    }
  }

  async getAllFollow(user: any) {
    try {
      console.log('Token:', user);

      const userId = user.userId;
      console.log('User ID:', userId);

      const follow = await this.prismaService.follows.findMany({
        where: {
          user_id: Number(userId),
        },
      });

      return follow;
    } catch (error) {
      throw error;
    }
  }

  async deleteArtistFollow(user: any, artist_id: number) {
    try {
      console.log('Token:', user);

      const userId = user.userId;
      console.log('User ID:', userId);

      const checkFollowing = await this.prismaService.follows.findFirst({
        where: {
          artist_id: Number(artist_id),
          user_id: Number(userId),
        },
      });

      if (!checkFollowing) {
        return 'You are not following this artist';
      } else {
        const unfollow = await this.prismaService.follows.deleteMany({
          where: {
            artist_id,
            user_id: Number(userId),
          },
        });

        return unfollow;
      }
    } catch (error) {
      throw error;
    }
  }

  async createFriend(user: any, friend_id: number) {
    try {
      console.log('Token:', user);

      const userId = user.userId;
      console.log('User ID:', userId);

      const checkFriend = await this.prismaService.friends.findFirst({
        where: {
          friend_id,
          user_id: Number(userId),
        },
      });

      if (checkFriend) {
        return 'You and this user are already friends';
      } else {
        const friend = await this.prismaService.friends.create({
          data: {
            friend_id,
            user_id: Number(userId),
            accept_date: new Date(),
          },
        });

        return friend;
      }
    } catch (error) {
      throw error;
    }
  }

  async getAllFriends(user: any) {
    try {
      console.log('Token:', user);

      const userId = user.userId;
      console.log('User ID:', userId);

      const friends = await this.prismaService.friends.findMany({
        where: {
          user_id: Number(userId),
        },
      });

      return friends;
    } catch (error) {
      throw error;
    }
  }

  async deleteFriend(user: any, friend_id: number) {
    try {
      console.log('Token:', user);

      const userId = user.userId;
      console.log('User ID:', userId);

      const checkFriend = await this.prismaService.friends.findFirst({
        where: {
          friend_id: Number(friend_id),
          user_id: Number(userId),
        },
      });

      if (!checkFriend) {
        return 'You are not a friend of this user';
      } else {
        const unfriend = await this.prismaService.friends.deleteMany({
          where: {
            friend_id,
            user_id: Number(userId),
          },
        });

        return unfriend;
      }
    } catch (error) {
      throw error;
    }
  }

}
