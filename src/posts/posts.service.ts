import { UsersService } from '../users/users.service';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postsRepository: Repository<Post>,
    private usersService: UsersService,
  ) {}

  async createPost(post: CreatePostDto) {
    const userFound = this.usersService.getUser(post.authorId);

    if (!userFound)
      return new HttpException('User not found', HttpStatus.NOT_FOUND);

    const newPost = this.postsRepository.create(post);
    return this.postsRepository.save(newPost);
  }

  getPosts() {
    return this.postsRepository.find();
  }
}
