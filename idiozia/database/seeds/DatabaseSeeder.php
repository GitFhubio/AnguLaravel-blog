<?php

use App\Tag;
use App\User;
use App\Reply;
use App\Article;
use App\Comment;
use App\Category;
use Faker\Generator as Faker;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Permission;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run(Faker $faker)
    {
        // $this->call(UserSeeder::class);
        $user1=new User();
        $user1->name='Admin';
        $user1->email='admin@outlook.it';
        $user1->password = Hash::make('beinformatica');
        $user1->save();
        $role1 = Role::create(['name' => 'superadmin']);
        $role2 = Role::create(['name' => 'admin']);
        $role3 = Role::create(['name' => 'writer']);
        $role4 = Role::create(['name' => 'editor']);
        $permission = Permission::create(['name' => 'edit-users']);
        $role1->givePermissionTo($permission);
        $user1->assignRole($role1);

        $user2=new User();
        $user2->name='Tim';
        $user2->email='Tim@outlook.it';
        $user2->password = Hash::make('beinformatica');
        $user2->save();

        $user3=new User();
        $user3->name='Vodafone';
        $user3->email='vodafone@outlook.it';
        $user3->password = Hash::make('beinformatica');
        $user3->save();

        $user4=new User();
        $user4->name='windtre';
        $user4->email='windtre@outlook.it';
        $user4->password = Hash::make('beinformatica');
        $user4->save();

        $categories =
        [ ['name'=>'Sport','slug'=>'sport'],
        ['name'=>'Politica','slug'=>'politica'],
        ['name'=>'Attualità','slug'=>'attualita'],
        ['name'=>'Scienza','slug'=>'scienza'],
        ['name'=>'Cucina','slug'=>'cucina']
        ];

        foreach ($categories as $category) {
            $newCategory=new Category();
            $newCategory->fill($category);
            $newCategory->save();
        }
        $tags =
        [
        ['name'=>'Dieta','slug'=>'dieta'],
        ['name'=>'Referendum','slug'=>'referendum'],
        ['name'=>'Papere','slug'=>'papere'],
        ['name'=>'Foodporn','slug'=>'foodporn']
        ];

        foreach ($tags as $tag) {
            $newTag=new Tag();
            $newTag->fill($tag);
            $newTag->save();
        }
        for ($i=0; $i < 3; $i++) {
            $newArticle = new Article();
            $newArticle->title= $faker->word();
            $newArticle->content = $faker->sentence();
            $newArticle->user_id = 1;
            $newArticle->save();
            $newArticle->tags()->attach(rand(1, 4));
            $newArticle->tags()->attach(rand(1, 4));
            $newArticle->categories()->attach(rand(1, 5));
            $newArticle->categories()->attach(rand(1, 5));
        }
        for ($i=0; $i < 3; $i++) {
            $newArticle = new Article();
            $newArticle->title= $faker->word();
            $newArticle->content = $faker->sentence();
            $newArticle->user_id = 2;
            $newArticle->save();
            $newArticle->tags()->attach(rand(1, 4));
            $newArticle->tags()->attach(rand(1, 4));
            $newArticle->categories()->attach(rand(1, 5));
            $newArticle->categories()->attach(rand(1, 5));
        }
        for ($i=0; $i < 3; $i++) {
            $newArticle = new Article();
            $newArticle->title= $faker->word();
            $newArticle->content = $faker->sentence();
            $newArticle->user_id = 3;
            $newArticle->save();
            $newArticle->tags()->attach(rand(1, 4));
            $newArticle->tags()->attach(rand(1, 4));
            $newArticle->categories()->attach(rand(1, 5));
            $newArticle->categories()->attach(rand(1, 5));
        }
        for ($i=0; $i < 20; $i++) {
            $newComment = new Comment();
            $newComment->body= $faker->text();
            $newComment->auth_id = rand(1, 4);
            $newComment->article_id = rand(1, 9);
            $newComment->save();
        }
        for ($i=0; $i < 20; $i++) {
            $newReply = new Reply();
            $newReply->body= $faker->text();
            $newReply->auth_id = rand(1, 4);
            $newReply->comment_id = rand(1, 19);
            $newReply->save();
        }
    }


}
