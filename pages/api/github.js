export const getRepos = async () => {
    const url = 'https://api.github.com/users/muhammadanjothosatru/repos'
    const response = await fetch(url)
    const json = await response.json()
    return json
}