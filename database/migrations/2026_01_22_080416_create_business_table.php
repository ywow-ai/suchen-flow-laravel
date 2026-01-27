<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tbx_products', function (Blueprint $table) {
            $table->id();
            $table->string('name', 100);
            $table->enum('category', ['Makanan', 'Minuman']);
            $table->text('description')->nullable();
            $table->string('image')->nullable();
            $table->softDeletes();
            $table->timestamps();

            $table->unique(['name']);
        });

        Schema::create('tbx_prices', function (Blueprint $table) {
            $table->id();
            $table->integer('price')->default(0);
            $table->unsignedBigInteger('product_id');
            $table->foreign('product_id')->references('id')->on('tbx_products');
            $table->softDeletes();
            $table->timestamps();

            $table->unique(['product_id']);
        });

        Schema::create('tbx_members', function (Blueprint $table) {
            $table->id();
            $table->string('name', 100);
            $table->text('description')->nullable();
            $table->string('image')->nullable();
            $table->softDeletes();
            $table->timestamps();

            $table->unique(['name']);
        });

        Schema::create('tbx_transactions', function (Blueprint $table) {
            $table->id();
            $table->enum('category', ['Expense', 'Income']);
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users');
            $table->string('customer_name', 100);
            $table->unsignedBigInteger('member_id')->nullable();
            $table->foreign('member_id')->references('id')->on('tbx_members');
            $table->softDeletes();
            $table->timestamps();
        });

        Schema::create('tbx_transaction_items', function (Blueprint $table) {
            $table->id();
            $table->integer('qty')->default(0);
            $table->integer('price')->default(0);
            $table->unsignedBigInteger('transaction_id');
            $table->foreign('transaction_id')->references('id')->on('tbx_transactions');
            $table->unsignedBigInteger('product_id');
            $table->foreign('product_id')->references('id')->on('tbx_products');
            $table->softDeletes();
            $table->timestamps();

            $table->unique(['transaction_id', 'product_id']);
        });

        Schema::create('tbx_cutoffs', function (Blueprint $table) {
            $table->id();
            $table->integer('qty')->default(0);
            $table->date('date');
            $table->unsignedBigInteger('product_id');
            $table->foreign('product_id')->references('id')->on('tbx_products');
            $table->softDeletes();
            $table->timestamps();

            $table->unique(['date', 'product_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tbx_transactions', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
        });

        Schema::dropIfExists('tbx_cutoffs');
        Schema::dropIfExists('tbx_transaction_items');
        Schema::dropIfExists('tbx_transactions');
        Schema::dropIfExists('tbx_prices');
        Schema::dropIfExists('tbx_members');
        Schema::dropIfExists('tbx_products');
    }
};
