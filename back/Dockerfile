FROM alpine:latest

RUN apk add --no-cache \
    ca-certificates

RUN mkdir /pb
COPY ./taxonomicle /pb/

# uncomment to copy the local pb_migrations dir into the image
COPY ./migrations /pb/pb_migrations

# uncomment to copy the local pb_hooks dir into the image
# COPY ./pb_hooks /pb/pb_hooks

EXPOSE 8080

# start PocketBase
CMD ["/pb/taxonomicle", "serve", "--http=0.0.0.0:8080"]