import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpsertUserDto } from './dto/upsert-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-strategy.guard';
import { GetUser } from 'src/auth/decorators/get-user-decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: UpsertUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@GetUser() user) {
    return this.userService.findById(user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('profile')
  update(@GetUser('userId') id, @Body() updateUserDto: UpsertUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('profile')
  remove(@GetUser('userId') id) {
    return this.userService.remove(+id);
  }
}
