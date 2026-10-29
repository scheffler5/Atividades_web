import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AutoresModule } from './autores/autores.module';
import { CategoriasModule } from './categorias/categorias.module';
import { EmprestimosModule } from './emprestimos/emprestimos.module';
import { LeitoresModule } from './leitores/leitores.module';
import { LivrosModule } from './livros/livros.module';
import { LogMiddleware } from './comum/log.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'sqlite',
        database: config.get<string>('DB_DATABASE', 'biblioteca.sqlite'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    AutoresModule,
    CategoriasModule,
    LivrosModule,
    LeitoresModule,
    EmprestimosModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LogMiddleware).forRoutes('*');
  }
}
