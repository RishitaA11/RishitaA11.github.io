if gpg --list-secret-keys --keyid-format LONG | grep -q ^sec 
then 
    echo "Do you want to use existing key? [Type yes/no]"
    read ans

    if [[ $ans == "yes" ]]
    then
        gpg --list-secret-keys --keyid-format LONG
        echo "Enter the key id for the key you want to register:"
        read id
        git config --global user.signingkey $id
        git config --global commit.gpgsign true
        echo "This key is registered!"
    elif [[ $ans == "no" ]]
    then
        gpg --full-generate-key
        gpg --list-secret-keys --keyid-format LONG
        echo "Enter the key id:"
        read id    
        git config --global user.signingkey $id
        git config --global commit.gpgsign true
        echo "This key is registered!"
    fi
else
        gpg --full-generate-key
        gpg --list-secret-keys --keyid-format LONG
        echo "Enter the key id:"
        read id    
        git config --global user.signingkey $id
        git config --global commit.gpgsign true
        echo "This key is registered!"
fi        

