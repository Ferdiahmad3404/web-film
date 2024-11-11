# Menggunakan image PHP dengan Apache
FROM php:8.2-apache

# Install ekstensi dan alat yang diperlukan
RUN apt-get update && apt-get install -y \
    zip \
    unzip \
    git \
    && docker-php-ext-install pdo pdo_mysql

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Salin file aplikasi ke direktori root Apache
COPY . /var/www/html

# Atur izin untuk folder storage
RUN chown -R www-data:www-data /var/www/html/storage

# Set environment variables untuk Apache
ENV APACHE_DOCUMENT_ROOT /var/www/html/public

# Set working directory untuk menjalankan perintah
WORKDIR /var/www/html

# Jalankan Composer untuk menginstal dependensi
RUN composer install --no-dev --optimize-autoloader

# Expose port untuk aplikasi
EXPOSE 80
